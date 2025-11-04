import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import HostelsList from "./pages/Dashboard/HostelsList";
import MessList from "./pages/Dashboard/MessList";
import BookingsList from "./pages/Dashboard/BookingsList";
import UsersList from "./pages/Dashboard/UsersList";
import ReportsDashboard from "./pages/Dashboard/ReportsDashboard";
import SubscriptionPlans from "./pages/Dashboard/SubscriptionPlans";
import PaymentPage from "./pages/Dashboard/PaymentPage";
import PaymentSuccess from "./pages/Dashboard/PaymentSuccess";
import ProfileSettings from "./pages/Dashboard/ProfileSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="hostels" element={<HostelsList />} />
              <Route path="mess" element={<MessList />} />
              <Route path="bookings" element={<BookingsList />} />
              <Route path="users" element={<UsersList />} />
              <Route path="reports" element={<ReportsDashboard />} />
              <Route path="subscription" element={<SubscriptionPlans />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="payment-success" element={<PaymentSuccess />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
