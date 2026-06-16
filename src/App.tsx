
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EnrollModalProvider } from "@/contexts/EnrollModalContext";
import PageLayout from "@/components/PageLayout";
import ScrollToHash from "./components/ScrollToHash";
import AuthHashHandler from "./components/AuthHashHandler";

const queryClient = new QueryClient();

const Index = lazy(() => import("./pages/Index"));
const Courses = lazy(() => import("./pages/Courses"));
const AgenticAiProgram = lazy(() => import("./pages/courses/AgenticAiProgram"));
const DevOpsEngineerProgram = lazy(() => import("./pages/courses/DevOpsEngineerProgram"));
const AwsSolutionsArchitectProgram = lazy(() => import("./pages/courses/AwsSolutionsArchitectProgram"));
const DataScienceProgram = lazy(() => import("./pages/courses/DataScienceProgram"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Enroll = lazy(() => import("./pages/Enroll"));
const Bonus = lazy(() => import("./pages/Bonus"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));
const LMSLayout = lazy(() => import("./pages/lms/LMSLayout"));
const LMSDashboard = lazy(() => import("./pages/lms/LMSDashboard"));
const LMSCurriculum = lazy(() => import("./pages/lms/LMSCurriculum"));
const LMSModuleDetail = lazy(() => import("./pages/lms/LMSModuleDetail"));
const LMSQuiz = lazy(() => import("./pages/lms/LMSQuiz"));
const LMSQuizScorecard = lazy(() => import("./pages/lms/LMSQuizScorecard"));
const LMSLiveSessions = lazy(() => import("./pages/lms/LMSLiveSessions"));
const LMSAssignments = lazy(() => import("./pages/lms/LMSAssignments"));
const LMSProjects = lazy(() => import("./pages/lms/LMSProjects"));
const LMSResources = lazy(() => import("./pages/lms/LMSResources"));
const LMSCertificate = lazy(() => import("./pages/lms/LMSCertificate"));
const LMSProfile = lazy(() => import("./pages/lms/LMSProfile"));
const Checkout = lazy(() => import("./pages/Checkout"));
const LearningSimulator = lazy(() => import("./pages/LearningSimulator"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const EnrollmentSuccess = lazy(() => import("./pages/EnrollmentSuccess"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceArticle = lazy(() => import("./pages/resources/ResourceArticle"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const VerifyCertificate = lazy(() => import("./pages/VerifyCertificate"));

const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

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
        <Suspense fallback={<RouteFallback />}>
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
                <Route
                  path="curriculum/:moduleId/quiz/:quizId/attempt/:attemptId"
                  element={<LMSQuizScorecard />}
                />
                <Route path="sessions" element={<LMSLiveSessions />} />
                <Route path="assignments" element={<LMSAssignments />} />
                <Route path="projects" element={<LMSProjects />} />
                <Route path="resources" element={<LMSResources />} />
                <Route path="certificate" element={<LMSCertificate />} />
                <Route path="profile" element={<LMSProfile />} />
              </Route>
              <Route path="/learn/:courseId" element={<LearningSimulator />} />
              <Route path="/enrollment/success" element={<EnrollmentSuccess />} />
              <Route path="/admin/*" element={<AdminRoute />} />
              <Route path="/verify-certificate" element={<VerifyCertificate />} />
              <Route path="/checkout/dop" element={<Navigate to="/checkout/devops-engineer-program" replace />} />
              <Route path="/checkout/:courseId" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        </BrowserRouter>
        </EnrollModalProvider>
        <Analytics />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
