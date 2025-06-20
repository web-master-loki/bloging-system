import React from 'react';
import '@/asset/css/Work/ConclusionSection.css';

interface ConclusionSectionProps {
  title?: string;
  text?: string;
}

const ConclusionSection: React.FC<ConclusionSectionProps> = ({
  title = "Conclusion",
  text = `Corem ipsum dolor sit amet, consectetur adipiscing elit. 
  Nunc vulputate libero et velit interdum, ac aliquet odio mattis. 
  Class aptent taciti sociosqu ad litora torquent per conubia nostra, 
  per inceptos himenaeos. Curabitur tempus urna at turpis condimentum 
  lobortis. Ut commodo efficitur neque. Ut diam quam, semper iaculis 
  condimentum ac, vestibulum eu nisl.`,
}) => {
  return (
    <div className="conclusion-section">
      <div className="conclusion-title">{title}</div>
      <div className="conclusion-divider"></div>
      <div className="conclusion-text">{text}</div>
    </div>
  );
};

export default ConclusionSection;
