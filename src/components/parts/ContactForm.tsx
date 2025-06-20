import React from 'react';
import '@/asset/css/Process/ContactForm.css';

const BrandChallengeForm = () => {
  return (
    <section className="brand-form-section">
      <div className="form-container">
        <h2>"Not Sure What You Need?"</h2>

        <div className="question-group">
          <p>“Pick 3 words that describe your brand…”</p>
          <div className="tag-options">
            <span>Bold</span>
            <span>Clean</span>
            <span>Luxury</span>
            <span>Playful</span>
            <span>Vibrant</span>
            <span>Elegant</span>
            <span>Minimal</span>
            <span>Innovative</span>
            <span>Professional</span>
            <span>Trustworthy</span>
          </div>
        </div>

        <div className="question-group">
          <p>"What's your biggest challenge?"</p>
          <div className="tag-options">
            <span>Brand Identity</span>
            <span>Website Design</span>
            <span>Marketing</span>
            <span>Storytelling</span>
            <span>Conversions</span>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>What is your good Name?</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>Your contact NO.*</label>
            <input type="text" />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Your Email*</label>
            <input type="email" />
          </div>
          <div className="input-group">
            <label>Drop your Msg..</label>
            <input type="text" />
          </div>
        </div>

        <div className="cta-buttons">
          <button>Let’s Collaborate</button>
        </div>

        <div className="contact-bottom">
          <p>
            would you rather directly get in touch? We always have the time for a call or email
          </p>
          <div className="contact-info">
            <a href="mailto:halo@studiovanadium.com">halo@studiovanadium.com</a>
            <span>|</span>
            <a href="tel:+6282142667785">+62 821-4266-7785</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandChallengeForm;
