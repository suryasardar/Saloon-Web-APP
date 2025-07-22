
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SalonDetail from "./pages/SalonDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import Profile from "./pages/Profile";
import UploadPhoto from "./pages/UploadPhoto";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Sign-up";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/salon/:id" element={<SalonDetail />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload-photo" element={<UploadPhoto />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
