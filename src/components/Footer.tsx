
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Facebook, Twitter, Instagram, Linkedin, Mail, Youtube, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaBehance, FaLinkedin, FaYoutube } from 'react-icons/fa';

import '@/asset/css/footer.css';
import logo from '@/asset/img/Footer/footer_logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'Process', href: '/process' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];


  const servicesLinks = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
  ];

  const socialLinks = [
    { name: 'Instagram', path: 'https://www.instagram.com/', icon: <FaInstagram /> },
    { name: 'Behance', path: 'https://behance.net/', icon: <FaBehance/> },
    { name: 'LinkedIn', path: 'https://in.linkedin.com/', icon: <FaLinkedin/> },
    { name: 'Youtube', path: 'https://www.youtube.com/', icon: <FaYoutube/> },
  ]

  return (
    <footer className="footer-container">
    <div className="footer-logo">
      <img src={logo} alt="WWC Logo" title='WWC Logo' />
    </div>

    <div className="footer-contact">
      <div>
        <h4>[Interested]</h4>
        <p>
          Contact us to evolve your business, whether you're a global brand or an emerging start-up. Let's work together.
        </p>
      </div>
      <div>
        <h4>[Contact]</h4>
        <p>halo@studiovanadium.com</p>
        <p>+62 821-4266-7785</p>
      </div>
      <div>
        <h4>[View on Map]</h4>
        <p>Jl. Saronojiwo I No. 33 Surabaya, 60299</p>
        <p>East Java – Indonesia</p>
      </div>
    </div>

    <div className="footer-social">
      <h4>[Social Media]</h4>
      <div className="social-links">
      {socialLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  target="_blank" rel="noreferrer"
                  // className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  {link.icon}
                  {link.name}
                </Link>
              </div>
            ))}
      </div>
    </div>
  </footer>
  );
};

export default Footer;
