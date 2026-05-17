
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import AiMlSyllabus from "./pages/syllabus/AiMlSyllabus";
import WebDevSyllabus from "./pages/syllabus/WebDevSyllabus";
import DevOpsSyllabus from "./pages/syllabus/DevOpsSyllabus";
import CybersecuritySyllabus from "./pages/syllabus/CybersecuritySyllabus";
import CloudComputingSyllabus from "./pages/syllabus/CloudComputingSyllabus";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enroll from "./pages/Enroll";
import Bonus from "./pages/Bonus";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import UserLanding from "./pages/UserLanding";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/syllabus" element={<Navigate to="/courses" replace />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/ai-ml" element={<AiMlSyllabus />} />
          <Route path="/courses/web-development" element={<WebDevSyllabus />} />
          <Route path="/courses/devops" element={<DevOpsSyllabus />} />
          <Route path="/courses/cybersecurity" element={<CybersecuritySyllabus />} />
          <Route path="/courses/cloud-computing" element={<CloudComputingSyllabus />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/bonus" element={<Bonus />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<UserLanding />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/checkout/:courseId" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
        <Analytics />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
