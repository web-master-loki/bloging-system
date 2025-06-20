import React, { useRef, useEffect, useCallback } from 'react';
import '@/asset/css/home/SelectedWorks.css';
import { ArrowUpRight } from 'lucide-react';
import img1 from '@/asset/img/home/work1.png';
import img2 from '@/asset/img/home/work2.png';
import img3 from '@/asset/img/home/work3.png';

interface Work {
  id: number;
  image: string;
}

const works: Work[] = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img1 },
  { id: 5, image: img2 },
  { id: 6, image: img3 },
  { id: 7, image: img3 },
  { id: 8, image: img1 },
  { id: 9, image: img2 },
  { id: 10, image: img3 },
];

const SelectedWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    const container = containerRef.current;
    if (!container || !container.matches(':hover')) return;

    e.preventDefault();
    const delta = e.deltaY * 4;
    container.scrollLeft += delta;

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <section className="selected-works-section">
      <h2 className="section-title">| Selected Works</h2>
      <div className="scroll-container" ref={containerRef}>
        {works.map((w) => (
          <div key={w.id} className="work-card">
            <img src={w.image} alt={`Work ${w.id}`} />
            <div className="btn-wrapper">
              <button className="work-btn">Show More</button>
              <ArrowUpRight size={20} className="btn-icon" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;
