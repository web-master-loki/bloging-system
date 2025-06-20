import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import "@/asset/css/Work/BrandingCaseStudy.css";
import service1 from "@/asset/vid/project/Urban_Monk/THUMBNAIL.png";
import service2 from "@/asset/vid/project/Urban_Monk/URBAN_MONK_RENDER_02.png";
import service3 from "@/asset/vid/project/Urban_Monk/URBAN_MONK_RENDER_03.png";

interface BrandingSection {
  title: string;
  shortDescription: string;
  tools: string[];
  challenge: string;
  What_we_did: string;
  topImage: string;
  category: string[];
  gallary: string[];
}

const BrandingSection: React.FC<BrandingSection> = ({
  title,
  shortDescription,
  tools,
  challenge,
  What_we_did,
  topImage,
  category,
  gallary,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const leftWidth = useTransform(scrollYProgress, [0, 1], ["50%", "10%"]);
  const rightWidth = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#111", "#f7f7f7"]);

  return (
    <motion.section className="branding-scroll-wrapper">
      <motion.div
        className="branding-container"
        ref={containerRef}
        style={{ backgroundColor }}
      >
        <motion.div
          className="branding-left sk-class"
          style={{ width: leftWidth }}
        >
          <motion.div
            className="left-content-service"
            style={{ opacity: leftOpacity }}
          >
            <h2 className="heading">
              {title}
            </h2>
            <p className="desc">
              {shortDescription}
            </p>

            <motion.div className="buttons">
              {category.map((btn, i) => (
                <motion.button key={i}>{btn}</motion.button>
              ))}
            </motion.div>

            <div className="tools">
              {tools.map((tool, i) => (                
                <span key={i} className="tool ps">{tool}</span>
              ))}
            </div>

            <motion.div className="section-workdetails">
              <h3>Challenge</h3>
              <span className="service-line">|</span>
              <p>{challenge}</p>
            </motion.div>

            <motion.div className="section-workdetails">
              <h3>What we did</h3>
              <span className="service-line">|</span>
              <p>{What_we_did}</p>
            </motion.div>
          </motion.div>

          <motion.div className="vertical-heading" style={{ opacity: headingOpacity }}>
            <h2>{title}</h2>
          </motion.div>
        </motion.div>

        <motion.div className="branding-right scroll-area hide-scrollbar" style={{ width: rightWidth }}>
          <div className="branding-scroll-content">
            <motion.div className="top-image">
              <img src={topImage} alt="Logo Explanation" />
            </motion.div>

            <motion.div  className="grid grid-cols-2 gap-4">
              {gallary.map((img, i) => (
                <img key={i} src={img} alt="Braind Image" className="rounded-lg" />
              ))}
            </motion.div>

            <div className="branding-scroll-end-spacer"></div>
          </div>
        </motion.div>
      </motion.div>

      <div className="branding-spacer"></div>
    </motion.section>
  );
};

export default BrandingSection;
