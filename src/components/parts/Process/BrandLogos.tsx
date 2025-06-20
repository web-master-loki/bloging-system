import React from "react";
import "@/asset/css/Process/BrandLogosSection.css";
import logo1 from "@/asset/img/logo1.png";
import logo2 from "@/asset/img/logo1.png";
import logo3 from "@/asset/img/logo1.png";
// Import other logos...

const BrandGridSection: React.FC = () => {
  const firstRow: string[] = [logo1, logo2, logo3, logo1, logo2];
  const secondRow: string[] = [logo3, logo1, logo2, logo3, logo1, logo2];

  return (
    <div className="brand-grid-section">
      <p className="description-brandlogo">
        Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra. Curabitur tempus urna at
        turpis condimentum lobortis.
      </p>
      <div className="grid-wrapper">
        <div className="row">
          {firstRow.map((logo, index) => (
            <img src={logo} alt={`logo-${index}`} key={index} />
          ))}
        </div>
        <div className="row">
          {secondRow.map((logo, index) => (
            <img className="brand-logo" src={logo} alt={`logo-${index + firstRow.length}`} key={index + firstRow.length} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandGridSection;
