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
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/register-dog" element={<DogRegistration />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/calendar" element={<AdminCalendar />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/create-booking" element={<CreateBooking />} />
            <Route path="/admin/clients" element={<Clients />} />
            <Route path="/admin/clients/:id" element={<ClientsDetail />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
