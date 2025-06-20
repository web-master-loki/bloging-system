
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./components/DashboardLayout";

// Public Pages
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPostView from "./pages/BlogPostView";
import Services from "./pages/Services";
import WebDevelopment from "./pages/WebDevelopment";
import MobileApps from "./pages/MobileApps";
import UIUXDesign from "./pages/UIUXDesign";
import DigitalMarketing from "./pages/DigitalMarketing";
import Work from "./pages/Work";
import WorkDetails from "./pages/WorkDetails";
import Process from "./pages/Process";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Career from "./pages/Career";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Settings from "./pages/Settings";
import PostView from "./pages/PostView";
import WorkManagementPage from "./pages/WorkManagement";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Public Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostView />} />
              <Route path="/OurService" element={<Services />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<WorkDetails />} />
              <Route path="/process" element={<Process />} />
              <Route path="/Us" element={<About />} />
              <Route path="/ContactUs" element={<Contact />} />
              <Route path="/Career" element={<Career />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* Auth Route (No Layout) */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes with Dashboard Layout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/create-post" element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            } />
            <Route path="/edit-post/:id" element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            } />
            <Route path="/post/:id" element={
              <ProtectedRoute>
                <PostView />
              </ProtectedRoute>
            } />
            <Route path="/work-management" element={
              <ProtectedRoute>
                <WorkManagementPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
