import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import DogRegistration from "./pages/DogRegistration";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCalendar from "./pages/admin/Calendar";
import AdminBookings from "./pages/admin/Bookings";
import CreateBooking from "./pages/admin/CreateBooking";
import Clients from "./pages/admin/Clients";
import ClientsDetail from "./pages/admin/ClientsDetail";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layout/AdminLayout";
import ClientLayout from "./layout/ClientLayout";
import Reviews from "./pages/admin/Reviews";
import RequireAdmin from "@/routes/RequireAdmin";
import AdminLogin from "./pages/admin/Login";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Client routes */}
            <Route element={<ClientLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/register-dog" element={<DogRegistration />} />
            </Route>

            {/* Admin routes */}
           <Route path="/admin/login" element={<AdminLogin />} />

            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="calendar" element={<AdminCalendar />} />
                <Route path="reviews" element={<Feedback />} />
                <Route path="clients" element={<Clients />} />
                <Route path="clients/:id" element={<ClientsDetail />} />
                <Route path="create-booking" element={<CreateBooking />} />
              </Route>
            </Route>


            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
