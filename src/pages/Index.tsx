
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PenTool, BookOpen, Settings } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Banner from "@/components/parts/home/banner";
import ScrollAnimatedText from "@/components/parts/home/ScrollAnimatedText";
import OurService from "@/components/parts/home/OurService";
import ServiceList from "@/components/parts/home/ServiceList";
import ProjectStart from "@/components/parts/home/ProjectStart";
import OurProcess from "@/components/parts/home/OurProcess";
import ProcessSteps from "@/components/parts/home/ProcessSteps";
import SelectedWorks from "@/components/parts/home/SelectedWorks";
import ExperienceSection from "@/components/parts/home/ExperienceSection";
import FoodBrandSection from "@/components/parts/home/FoodBrandSection";
import CallToAction from "@/components/parts/CallToAction";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEOHead 
        title="WCC CMS - Modern Content Management System"
        description="A powerful content management system for bloggers and content creators. Manage your blog posts, optimize SEO, and publish with ease."
        keywords="CMS, blog, content management, SEO, publishing"
        type="website"
      />    
      <Banner />
      <ScrollAnimatedText />
      <OurService />
      <ServiceList />
      <ProjectStart />
      <OurProcess />
      <ProcessSteps />
      <SelectedWorks />
      <ExperienceSection />
      <FoodBrandSection />
      <CallToAction />
    </div>
  );
};

export default Index;
