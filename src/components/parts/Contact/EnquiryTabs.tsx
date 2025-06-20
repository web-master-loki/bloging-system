import React, { useState } from 'react';
import '@/asset/css/Contact/EnquiryTabs.css';

type TabType = 'general' | 'project' | 'career';

const EnquiryTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const renderForm = () => {
    switch (activeTab) {
      case 'general':
        return (
          <>
            <h3 className="general-title">“Let us help You realize your Vision”</h3>
            <div className="general-form-row">
              <div className="form-group">
                <input type="text" placeholder="What is your good Name?" />
                <input type="email" placeholder="Your Email*" />
                <button>Send Message</button>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Your contact NO.*" />
                <input type="text" placeholder="Drop your Msg.." />
                <div className="direct-contact">
                  <p>
                    Would you rather directly get in touch? We always have the time for a call or email
                  </p>
                  <div className="contact-info">
                    <span>halo@studiovanadium.com</span>
                    <span>|</span>
                    <span>+62 821-4266-7785</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'project':
        return (
          <>
            <div className="form-container">
              <h2>"Not Sure What You Need?"</h2>

              <div className="question-group">
                <p>“Pick 3 words that describe your brand…”</p>
                <div className="tag-options">
                  {['Bold', 'Clean', 'Luxury', 'Playful', 'Vibrant', 'Elegant', 'Minimal', 'Innovative', 'Professional', 'Trustworthy'].map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="question-group">
                <p>"What's your biggest challenge?"</p>
                <div className="tag-options">
                  {['Brand Identity', 'Website Design', 'Marketing', 'Storytelling', 'Conversions'].map((challenge, idx) => (
                    <span key={idx}>{challenge}</span>
                  ))}
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
                <p>Would you rather directly get in touch? We always have the time for a call or email</p>
                <div className="contact-info">
                  <a href="mailto:halo@studiovanadium.com">halo@studiovanadium.com</a>
                  <span>|</span>
                  <a href="tel:+6282142667785">+62 821-4266-7785</a>
                </div>
              </div>
            </div>
          </>
        );
      case 'career':
        return (
          <>
            <p>For career opportunities, send your resume and portfolio to:</p>
            <div className="contact-info">
              <span>careers@studiovanadium.com</span>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tab-headers">
        <button className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}>
          General Enquiry
        </button>
        <button className={activeTab === 'project' ? 'active' : ''} onClick={() => setActiveTab('project')}>
          Project Enquiry
        </button>
        <button className={activeTab === 'career' ? 'active' : ''} onClick={() => setActiveTab('career')}>
          Career Enquiry
        </button>
      </div>

      <div className="tab-content">{renderForm()}</div>
    </div>
  );
};

export default EnquiryTabs;
