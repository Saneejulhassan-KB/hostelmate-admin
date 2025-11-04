import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight, BarChart3, Calendar, Shield } from 'lucide-react';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-accent shadow-glow mb-4">
            <Building2 className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            HostelMate Admin
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The complete solution for hostel and mess owners to manage properties, bookings, and subscriptions with ease.
          </p>

          <div className="flex gap-4 justify-center pt-8">
            <Button 
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 h-12 px-8"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              size="lg"
              variant="outline"
              className="h-12 px-8"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="text-center space-y-3 p-6 rounded-2xl bg-card hover-scale">
            <div className="h-14 w-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
            <p className="text-muted-foreground">Track bookings, revenue, and occupancy in real-time</p>
          </div>

          <div className="text-center space-y-3 p-6 rounded-2xl bg-card hover-scale">
            <div className="h-14 w-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center">
              <Calendar className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Smart Bookings</h3>
            <p className="text-muted-foreground">Manage all hostel and mess bookings efficiently</p>
          </div>

          <div className="text-center space-y-3 p-6 rounded-2xl bg-card hover-scale">
            <div className="h-14 w-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Secure & Reliable</h3>
            <p className="text-muted-foreground">Enterprise-grade security for your data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
