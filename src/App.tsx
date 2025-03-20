
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ServicesDetail from "./pages/ServicesDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <AnimatedBackground />
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/services/:serviceId" element={<ServicesDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
