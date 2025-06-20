
import ConclusionSection from '@/components/parts/About/ConclusionSection';
import LeadersSection from '@/components/parts/About/LeadersSection';
import SnapScrollSections from '@/components/parts/About/SnapScrollSections';
import CallToAction from '@/components/parts/CallToAction';
import ExperienceSection from '@/components/parts/home/ExperienceSection';
import SEOHead from '@/components/SEOHead';

const About = () => {

  return (
    <div>
      <SEOHead 
        title="About Us - WCC"
        description="Learn about WCC team, our mission, and how we help businesses succeed in the digital world."
        keywords="about us, team, company, mission, digital agency"
        type="website"
      />
      
      <SnapScrollSections />
      <ConclusionSection />
      <ExperienceSection />
      <LeadersSection />
      <CallToAction />
    </div>
  );
};

export default About;
