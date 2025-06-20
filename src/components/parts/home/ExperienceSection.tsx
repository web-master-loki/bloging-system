import React, { useRef, useEffect, useState, RefObject } from 'react';
import '@/asset/css/home/ExperienceSection.css';

const useScrollCounter = (
  targetNumber: number,
  reset: boolean = false
): [number, RefObject<HTMLHeadingElement>] => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView) {
      if (reset) setCount(0);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * targetNumber));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, targetNumber, reset]);

  return [count, ref];
};

const ExperienceSection: React.FC = () => {
  const [years, headingRef] = useScrollCounter(15, true);
  const [projects, projectRef] = useScrollCounter(1000, true);
  const [clients, clientRef] = useScrollCounter(100, true);

  return (
    <section className="experience-section">
      <div className="experience-left">
        <h2 ref={headingRef} className="experience-heading">{years}+ Years Experience</h2>
        <p className="experience-description">
          With over 15 years of delivering value, White Warbler Communications is more than a design studio in Pune,
          we’re your long-term brand partners. From custom packaging design for food brands to building SEO-optimized
          websites and digital ecosystems, our team brings cross-industry expertise and deep local insights from Pune.
        </p>
      </div>
      <div className="experience-right">
        <div ref={projectRef as RefObject<HTMLDivElement>} className="stat-box">
          <h3 className="stat-number">{projects}+</h3>
          <p className="stat-label">Successful Projects</p>
        </div>
        <div ref={clientRef as RefObject<HTMLDivElement>} className="stat-box">
          <h3 className="stat-number">{clients}+</h3>
          <p className="stat-label">Happy Clients</p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
