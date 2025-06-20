import React from 'react';
import '@/asset/css/home/FoodBrandSection.css';
import brandImage from '@/asset/img/home/brand-packaging.png';

const FoodBrandSection: React.FC = () => {
  return (
    <section className="food-brand-section">
      <div className="content-left">
        <h2 className="headline">Designing the Future of Food Brands</h2>
        <div className="description-foodbrand">
          <h4>What We Do for Food Brands:</h4>
          <ul>
            <li>Package that sells: Designs that make your products pop off the shelf (or the screen).</li>
            <li>Branding that connects: Build trust with designs that resonate with food lovers.</li>
            <li>Campaigns that make noise: 360° campaigns for launches, seasonal pushes, or everyday buzz.</li>
          </ul>
        </div>
      </div>
      <div className="content-right">
        <img src={brandImage} alt="Packaging Designs" className="brand-image" />
        <p className="tagline">"We Create Packaging That Pops."</p>
      </div>
    </section>
  );
};

export default FoodBrandSection;
