
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CandidateProfile from "./pages/CandidateProfile";
import JobDescriptions from "./pages/JobDescriptions";
import UploadResumes from "./pages/UploadResumes";
import TestManagement from "./pages/TestManagement";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/candidate/:id" element={<ProtectedRoute><CandidateProfile /></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><JobDescriptions /></ProtectedRoute>} />
              <Route path="/upload" element={<ProtectedRoute><UploadResumes /></ProtectedRoute>} />
              <Route path="/tests" element={<ProtectedRoute><TestManagement /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
