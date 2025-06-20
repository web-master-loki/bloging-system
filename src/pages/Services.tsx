
import Banner from '@/components/parts/Services/Banner';
import CallToAction from '@/components/parts/CallToAction';
import ServiceSection from '@/components/parts/Services/ServiceSection';
import ToolsSection from '@/components/parts/ToolsSection';
import SEOHead from '@/components/SEOHead';

const Services = () => {
  
  return (
    <div>
      <SEOHead 
        title="Our Services - WCC"
        description="Comprehensive digital solutions including web development, mobile apps, UI/UX design, and digital marketing services."
        keywords="web development, mobile apps, UI/UX design, digital marketing, services"
        type="website"
      />
      
      <Banner />
      <ServiceSection />
      <ToolsSection />
      <CallToAction />
    </div>
  );
};

export default Services;
