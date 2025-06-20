import React from 'react';
import '@/asset/css/ToolsSection.css';

import photoshop from '@/asset/icons/Photoshop.png';
import illustrator from '@/asset/icons/Illustrator.png';
import figma from '@/asset/icons/Figma.png';
import afterEffects from '@/asset/icons/After_effects.png';

type IconKey = 'photoshop' | 'illustrator' | 'figma' | 'after-effects';

const iconMap: Record<IconKey, string> = {
  photoshop,
  illustrator,
  figma,
  'after-effects': afterEffects,
};

const icons: IconKey[][] = [
  ['after-effects', 'illustrator', 'photoshop', 'illustrator', 'figma', 'after-effects', 'illustrator', 'photoshop'],
  ['after-effects', 'illustrator', 'photoshop', 'illustrator', 'figma', 'after-effects', 'illustrator', 'photoshop'],
];

const ToolsSection: React.FC = () => {
  return (
    <div className="tools-section">
      <p className="tools-description">
        Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum,
        ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
      </p>
      <hr className="tools-divider" />
      <div className="icons-grid">
        {icons.map((row, rowIndex) => (
          <div className="icon-row" key={rowIndex}>
            {row.map((iconKey, index) => (
              <img
                key={index}
                src={iconMap[iconKey]}
                alt={iconKey}
                className="tool-icon"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsSection;
