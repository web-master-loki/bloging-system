
import CareerIntroSection from '@/components/parts/Career/CareerIntroSection';
import BannerSection from '@/components/parts/BannerSection';
import SEOHead from '@/components/SEOHead';

const Career = () => {

  return (
    <div>
      <SEOHead 
        title="Career - WCC"
        description="Explore our portfolio of successful projects including web applications, mobile apps, and digital solutions."
        keywords="portfolio, projects, web development, mobile apps, case studies"
        type="website"
      />
      
      <BannerSection />
      <CareerIntroSection />
    </div>
  );
};

export default Career;
