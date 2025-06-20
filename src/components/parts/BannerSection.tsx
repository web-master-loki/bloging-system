import '@/asset/css/BannerSection.css';
import React from 'react';

interface ContactBannerProps {
  title?: string;
  slogan?: string;
}

const BannerSection : React.FC<ContactBannerProps> = ({ title, slogan }) => {
  return (
    <section className="contact-banner">
      <div className="contact-banner-inner">
        <h1>{ title || "Let’s Get in Touch"}</h1>
        <p>{ slogan || "We’d love to hear about your project or idea."}</p>
        {/* You can add form or image here */}
      </div>
    </section>
  );
};

export default BannerSection;
