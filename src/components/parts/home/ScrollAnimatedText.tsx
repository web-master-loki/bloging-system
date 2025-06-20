import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '@/asset/css/home/ScrollAnimatedText.css';

const headline: string = "Bring your brand to life with visuals that resonate. Let’s start today!";

interface LetterProps {
  char: string;
  index: number;
  visible: boolean;
}

const Letter: React.FC<LetterProps> = ({ char, index, visible }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
    transition={{ duration: 0.03, delay: index * 0.03 }}
    className="headline-letter"
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);

const ScrollAnimatedText: React.FC = () => {
  const [showText, setShowText] = useState<boolean>(true);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDir('down');
        setShowText(true);
      } else {
        setScrollDir('up');
        setShowText(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollDir);
    return () => window.removeEventListener('scroll', updateScrollDir);
  }, []);

  return (
    <div className="animated-text-container">
      <div className="animated-text">
        {headline.split('').map((char, i) => (
          <Letter
            key={i}
            char={char}
            index={scrollDir === 'down' ? i : headline.length - i}
            visible={showText}
          />
        ))}
      </div>
      <button className="collab-button">Let’s Collaborate</button>
    </div>
  );
};

export default ScrollAnimatedText;