import React, { useEffect, useRef } from 'react';
import '@/asset/css/Work/PortfolioSlider.css';

import img1 from '@/asset/img/WorkPages/portfolio1.png';
import img2 from '@/asset/img/WorkPages/portfolio1.png';
import img3 from '@/asset/img/WorkPages/portfolio1.png';
import img4 from '@/asset/img/WorkPages/portfolio1.png';

interface Service {
  id: number;
  title: string;
  image: string;
  link: string;
}

const services: Service[] = [
  { id: 1, title: 'Branding', image: img1, link: '/services/branding' },
  { id: 2, title: 'Web Design', image: img2, link: '/services/web-design' },
  { id: 3, title: 'UI/UX', image: img3, link: '/services/uiux' },
  { id: 4, title: 'Marketing', image: img4, link: '/services/marketing' },
];

const ServiceSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isHoveredRef = useRef(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const duplicatedContent = slider.innerHTML;
    slider.innerHTML += duplicatedContent;

    const scroll = () => {
      if (!isHoveredRef.current) {
        slider.scrollLeft += 0.5;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className="service-slider"
      ref={sliderRef}
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
    >
      {services.map((service) => (
        <div className="slide-item" key={service.id}>
          <img src={service.image} alt={service.title} />
          <div className="overlay">
            <a href={service.link} className="title-link">{service.title}</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSlider;
