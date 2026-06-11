
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PageLayout from "@/components/PageLayout";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import AiMlSyllabus from "./pages/syllabus/AiMlSyllabus";
import DevOpsSyllabus from "./pages/syllabus/DevOpsSyllabus";
import CloudComputingSyllabus from "./pages/syllabus/CloudComputingSyllabus";
import DataScienceSyllabus from "./pages/syllabus/DataScienceSyllabus";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enroll from "./pages/Enroll";
import Bonus from "./pages/Bonus";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import UserLanding from "./pages/UserLanding";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ScrollToHash from "./components/ScrollToHash";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/syllabus" element={<Navigate to="/courses" replace />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/dop" element={<DevOpsSyllabus />} />
            <Route path="/courses/aac" element={<AiMlSyllabus />} />
            <Route path="/courses/aws" element={<CloudComputingSyllabus />} />
            <Route path="/courses/data-science" element={<DataScienceSyllabus />} />
            <Route path="/courses/ai-ml" element={<Navigate to="/courses/aac" replace />} />
            <Route path="/courses/devops" element={<Navigate to="/courses/dop" replace />} />
            <Route path="/courses/cloud-computing" element={<Navigate to="/courses/aws" replace />} />
            <Route path="/courses/web-development" element={<Navigate to="/courses/data-science" replace />} />
            <Route path="/courses/cybersecurity" element={<Navigate to="/courses" replace />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/bonus" element={<Bonus />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<UserLanding />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/checkout/:courseId" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </BrowserRouter>
        <Analytics />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
