
import BrandChallengeForm from '@/components/parts/ContactForm';
import ExperienceSection from '@/components/parts/home/ExperienceSection';
import OurService from '@/components/parts/home/OurService';
import ProcessSteps from '@/components/parts/home/ProcessSteps';
import BrandGridSection from '@/components/parts/Process/BrandLogos';
import TestimonialSlider from '@/components/parts/TestimonialSlider';
import SEOHead from '@/components/SEOHead';

const Process = () => {
  return (
    <div>
      <SEOHead 
        title="Our Process - WCC"
        description="Learn about our proven development process from discovery to launch, ensuring successful project delivery."
        keywords="development process, project management, web development workflow, methodology"
        type="website"
      />
      
      <OurService />
      <ProcessSteps />
      <ExperienceSection />
      <BrandGridSection />
      <BrandChallengeForm />
      <TestimonialSlider />
    </div>
  );
};

export default Process;
