import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { FaInstagram, FaBehance, FaLinkedin, FaYoutube } from 'react-icons/fa';

import '@/asset/css/header.css';
import logo from '@/asset/img/Footer/footer_logo.png';

const slides: string[] = ['Packaging', 'Branding', '360 Campaigns', 'UI/UX Design'];

interface NavItem {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

   const socialLinks = [
      { name: 'Instagram', path: 'https://www.instagram.com/', icon: <FaInstagram /> },
      { name: 'Behance', path: 'https://behance.net/', icon: <FaBehance/> },
      { name: 'LinkedIn', path: 'https://in.linkedin.com/', icon: <FaLinkedin/> },
      { name: 'Youtube', path: 'https://www.youtube.com/', icon: <FaYoutube/> },
    ]

  const navMenu1: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Service', path: '/OurService' },
    { name: 'Project', path: '/Project' },
    { name: 'Process', path: '/Process' },
    { name: 'Us', path: '/Us' },
  ];

  const navMenu2: NavItem[] = [
    { name: 'Contact', path: '/ContactUs' },
    { name: 'Career', path: '/Career' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <div className="header">
      <div className="logo-container">
        <a href="/"><img src={logo} alt="Logo" /></a><span>|</span>
        <div className="vertical-text">
          <motion.p
            key={currentSlide}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6 }}
          >
            {slides[currentSlide]}
          </motion.p>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/OurService" className={({ isActive }) => isActive ? 'active' : ''}>Service</NavLink>
        <NavLink to="/Work" className={({ isActive }) => isActive ? 'active' : ''}>Work</NavLink>
        <NavLink to="/Process" className={({ isActive }) => isActive ? 'active' : ''}>Process</NavLink>
        <NavLink to="/Us" className={({ isActive }) => isActive ? 'active' : ''}>Us</NavLink>
      </nav>

      {!isOpen && (
        <button className="hamburger" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
          <svg className="progress-ring" viewBox="0 0 40 40">
            <circle className="ring-bg" cx="20" cy="20" r="18" />
            <circle
              className="ring-fill"
              cx="20"
              cy="20"
              r="18"
              style={{
                strokeDasharray: 113,
                strokeDashoffset: 113 - (113 * scrollPercent) / 100,
              }}
            />
          </svg>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="menu-left">
              <div>
                <img src={logo} alt="Logo" />
                <div className="links">
                  <div className="hamenu">
                    {navMenu1.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  <div className="hamenu1">
                    {navMenu2.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="social-section">
                <h1>Social Media</h1>
                <div className="socials">
                  {socialLinks.map((link) => (
                    <i key={link.name}>
                      {link.icon} 
                    </i>
                  ))}
                </div>
              </div>
            </div>

            <div className="menu-right">
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
              <img src={logo} alt="Logo" className="mb-6" />
              <h2>
                Bring your brand to life with visuals that resonate.<br />
                Let’s start today!
              </h2>
              <p>Send us a message and let's collaborate on your project.</p>
              <div className="buttons">
                <button>Let's Collaborate</button>
                <button>Company Profile</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
