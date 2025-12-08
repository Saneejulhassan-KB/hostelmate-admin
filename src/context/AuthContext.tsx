import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authService } from '@/services/api';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string, username: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('hostelmate_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });
      
      // Store tokens
      if (data.access) localStorage.setItem('access_token', data.access);
      if (data.refresh) localStorage.setItem('refresh_token', data.refresh);

      // Create user object (decoding token would be better, but using placeholder for now)
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        role: 'owner'
      };
      setUser(mockUser);
      localStorage.setItem('hostelmate_user', JSON.stringify(mockUser));
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  };

  const register = async (email: string, password: string, confirmPassword: string, name: string) => {
    try {
      await authService.register({
        username: name,
        email,
        password,
        password2: confirmPassword,
        first_name: name.split(' ')[0],
        last_name: name.split(' ').slice(1).join(' '),
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('hostelmate_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
