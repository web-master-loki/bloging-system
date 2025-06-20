import React, { useState } from 'react';
import '@/asset/css/Contact/ContactSection.css';
import { Mail, Phone, Globe, MapPin, Map } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [showMap, setShowMap] = useState<boolean>(false);

  return (
    <section className="contact-section">
      <div className="contact-grid">
        <div className="contact-box">
          <h3>Contact</h3>
          <ul className="contact-list">
            <li><Mail size={16} /> halo@studiovanadium.com</li>
            <li><Phone size={16} /> +62 821-4266-7785</li>
            <li><Globe size={16} /> halo@studiovanadium.com</li>
            <li
              className="map-toggle"
              onClick={() => setShowMap(!showMap)}
              style={{ cursor: 'pointer' }}
            >
              <Map size={16} /> View Map
            </li>
          </ul>
        </div>

        <div className="address-box">
          <h3>Address</h3>
          <div className="address-content">
            <p><MapPin size={16} /> Main Office</p>
            <p>
              Jl. Saronojiwo I No. 33 Surabaya, 60299<br />
              East Java – Indonesia
            </p>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="contact-map-bar">
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.2754003263316!2d112.74066277416473!3d-7.209085092772027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbfd00e85cf9%3A0x2fd0ab34a91b8a5c!2sJl.%20Saronojiwo%20I%20No.33%2C%20Panjen%2C%20Tenggilis%20Mejoyo%2C%20Kec.%20Tenggilis%20Mejoyo%2C%20Kota%20SBY%2C%20Jawa%20Timur%2060299%2C%20Indonesia!5e0!3m2!1sen!2sin!4v1717959683046!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '24px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
