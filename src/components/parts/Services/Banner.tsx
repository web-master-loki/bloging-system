import '@/asset/css/Services/Banner.css';
import { Bird } from 'lucide-react'; // or replace with your own SVG if needed

const Banner = () => {
  return (
    <section className="our-service-section">
      <div className="service-header">
        <div className="line"></div>
        <h2 className="services-title">Our Service</h2>
        <Bird size={28} className="service-icon" />
      </div>
      <p className="service-description">
        Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, 
        ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per 
        inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
      </p>
    </section>
  );
};

export default Banner;
