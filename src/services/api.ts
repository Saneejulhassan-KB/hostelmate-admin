import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://remark-ours-around-weight.trycloudflare.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface Hostel {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  is_verified: boolean;
  availability_summary: string;
  description: string;
  hostel_type: string;
  facilities: { id: string; name: string }[];
  mess_menus: {
    id: string;
    day: string;
    veg_menu: { breakfast: string; lunch: string; dinner: string };
    nonveg_menu: { breakfast: string; lunch: string; dinner: string };
  }[];
  rooms: {
    id: string;
    room_number: string;
    is_available: boolean;
    room_type: string;
    images: { id: string; image: string }[];
    description: string;
    monthly_price: number;
    daily_price: number;
    facilities: { id: string; name: string }[];
    capacity: number;
  }[];
  rules: {
    id: string;
    title: string;
    rule_type: string;
    description: string;
  }[];
  images: {
    id: string;
    image: string;
    caption?: string;
  }[];
}

export const hostelService = {
  getHostels: async (page: number = 1) => {
    const response = await api.get(`/users/hostels/?page=${page}`);
    return response.data;
  },
};

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/token/', credentials);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/users/register/', data);
    return response.data;
  },
  logout: () => {
    // If there's a server-side logout, call it here
    // await api.post('/users/logout/');
  },
};

export default api;
