
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EnrollModalProvider } from "@/contexts/EnrollModalContext";
import PageLayout from "@/components/PageLayout";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import AgenticAiProgram from "./pages/courses/AgenticAiProgram";
import DevOpsEngineerProgram from "./pages/courses/DevOpsEngineerProgram";
import AwsSolutionsArchitectProgram from "./pages/courses/AwsSolutionsArchitectProgram";
import DataScienceProgram from "./pages/courses/DataScienceProgram";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enroll from "./pages/Enroll";
import Bonus from "./pages/Bonus";
import Profile from "./pages/Profile";
import AdminRoute from "./components/AdminRoute";
import LMSLayout from "./pages/lms/LMSLayout";
import LMSDashboard from "./pages/lms/LMSDashboard";
import LMSCurriculum from "./pages/lms/LMSCurriculum";
import LMSModuleDetail from "./pages/lms/LMSModuleDetail";
import LMSQuiz from "./pages/lms/LMSQuiz";
import LMSLiveSessions from "./pages/lms/LMSLiveSessions";
import LMSAssignments from "./pages/lms/LMSAssignments";
import LMSProjects from "./pages/lms/LMSProjects";
import LMSResources from "./pages/lms/LMSResources";
import LMSCertificate from "./pages/lms/LMSCertificate";
import LMSProfile from "./pages/lms/LMSProfile";
import Checkout from "./pages/Checkout";
import LearningSimulator from "./pages/LearningSimulator";
import ResetPassword from "./pages/ResetPassword";
import EnrollmentSuccess from "./pages/EnrollmentSuccess";
import NotFound from "./pages/NotFound";
import Resources from "./pages/Resources";
import ResourceArticle from "./pages/resources/ResourceArticle";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VerifyCertificate from "./pages/VerifyCertificate";
import ScrollToHash from "./components/ScrollToHash";
import AuthHashHandler from "./components/AuthHashHandler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <EnrollModalProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <AuthHashHandler />
        <ScrollToHash />
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/syllabus" element={<Navigate to="/courses" replace />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/devops-engineer-program" element={<DevOpsEngineerProgram />} />
            <Route path="/courses/dop" element={<Navigate to="/courses/devops-engineer-program" replace />} />
            <Route path="/courses/aac" element={<AgenticAiProgram />} />
            <Route path="/courses/aws" element={<AwsSolutionsArchitectProgram />} />
            <Route path="/courses/data-science" element={<DataScienceProgram />} />
            <Route path="/courses/ai-ml" element={<Navigate to="/courses/aac" replace />} />
            <Route path="/courses/devops" element={<Navigate to="/courses/devops-engineer-program" replace />} />
            <Route path="/courses/cloud-computing" element={<Navigate to="/courses/aws" replace />} />
            <Route path="/courses/web-development" element={<Navigate to="/courses/data-science" replace />} />
            <Route path="/courses/cybersecurity" element={<Navigate to="/courses" replace />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceArticle />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/bonus" element={<Bonus />} />
            <Route path="/proifle" element={<Navigate to="/profile" replace />} />
            <Route path="/profie" element={<Navigate to="/profile" replace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboarsd" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<LMSLayout />}>
              <Route index element={<LMSDashboard />} />
              <Route path="curriculum" element={<LMSCurriculum />} />
              <Route path="curriculum/:moduleId" element={<LMSModuleDetail />} />
              <Route path="curriculum/:moduleId/quiz/:quizId" element={<LMSQuiz />} />
              <Route path="curriculum/:moduleId/quiz" element={<LMSQuiz />} />
              <Route path="sessions" element={<LMSLiveSessions />} />
              <Route path="assignments" element={<LMSAssignments />} />
              <Route path="projects" element={<LMSProjects />} />
              <Route path="resources" element={<LMSResources />} />
              <Route path="certificate" element={<LMSCertificate />} />
              <Route path="profile" element={<LMSProfile />} />
            </Route>
            <Route path="/learn/:courseId" element={<LearningSimulator />} />
            <Route path="/enrollment/success" element={<EnrollmentSuccess />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            <Route path="/checkout/dop" element={<Navigate to="/checkout/devops-engineer-program" replace />} />
            <Route path="/checkout/:courseId" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </BrowserRouter>
        </EnrollModalProvider>
        <Analytics />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
