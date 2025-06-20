import React from "react";
import "@/asset/css/Work/NutPackagingShowcase.css";

interface NutPackagingShowcaseProps {
  topImage: string;
  bottomLeftImage: string;
  bottomRightImage: string;
  altTextTop?: string;
  altTextLeft?: string;
  altTextRight?: string;
}

const NutPackagingShowcase: React.FC<NutPackagingShowcaseProps> = ({
  topImage,
  bottomLeftImage,
  bottomRightImage,
  altTextTop = "Top Product",
  altTextLeft = "Bottom Left Product",
  altTextRight = "Bottom Right Product",
}) => {
  return (
    <div className="nut-packaging-container">
      <div className="top-section">
        <img src={topImage} alt={altTextTop} />
      </div>

      <div className="bottom-section">
        <div className="bottom-image">
          <img src={bottomLeftImage} alt={altTextLeft} />
        </div>
        <div className="bottom-image">
          <img src={bottomRightImage} alt={altTextRight} />
        </div>
      </div>
    </div>
  );
};

export default NutPackagingShowcase;
