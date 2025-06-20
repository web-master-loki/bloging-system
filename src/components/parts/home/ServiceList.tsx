import React, { useEffect, useRef } from 'react';
import '@/asset/css/home/ServiceList.css';

import Service1 from '@/asset/img/home/service1.gif';
import Service2 from '@/asset/img/home/service2.gif';
import Service3 from '@/asset/img/home/service3.gif';
import Service4 from '@/asset/img/home/service4.gif';
import Service5 from '@/asset/img/home/service5.gif';

interface ServiceItem {
  number: string;
  title: string;
  services: string[];
  image: string;
}

const services: ServiceItem[] = [
  {
    number: '01',
    title: 'Brand Strategy',
    services: ['Logo Design', 'Brand Identity'],
    image: Service1,
  },
  {
    number: '02',
    title: 'UX/UI Design',
    services: ['Web UI', 'App UI'],
    image: Service2,
  },
  {
    number: '03',
    title: 'Content Creation',
    services: ['Photography', 'Videography'],
    image: Service3,
  },
  {
    number: '04',
    title: 'Development',
    services: ['Web Development', 'App Development'],
    image: Service4,
  },
  {
    number: '05',
    title: 'Marketing',
    services: ['SEO', 'Social Media'],
    image: Service5,
  },
];

const ServiceList: React.FC = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sections = sectionsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="service-container">
      {services.map((service, index) => (
        <div
          className="section"
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
        >
          <div className="text">
            <div className="service-tn">
              <div className="number">{service.number}</div>
              <span className="service-line">|</span>
              <div className="title">{service.title}</div>
            </div>
            <div className="services">
              {service.services.map((srv, i) => (
                <span key={i}>{srv}</span>
              ))}
            </div>
          </div>
          <div className="image">
            <img src={service.image} alt={service.title} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
