
import React from 'react';
import '@/asset/css/CallToAction.css';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="cta-wrapper">
      <div className="cta-box">
        <h2 className="cta-heading">Ready to Start Your Project?</h2>
        <h3 className="cta-subheading">Let's Work Together</h3>
        <p className="cta-text">
          Get in touch with us today to discuss your project requirements and see how we can help bring your vision to life.
        </p>
        <div className="cta-buttons">
          <button className="cta-btn">
            <Mail className="h-4 w-4" />
            Get In Touch
          </button>
          <button className="cta-btn">
            <Phone className="h-4 w-4" />
            Schedule Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
