import React from "react";
import "./SeviceHero.css";
import { useNavigate } from "react-router-dom";

const SeviceHero = () => {
  const nav = useNavigate();
  return (
    <div className="max-wid">
      <div className="service-hero">
        <div className="hero-left">
          <h1 className="t-2" style={{ textAlign: "start" }}>
            {" "}
            {/* Why choose our services` */}
            WHY CHOOSE OUR SERVICES?
          </h1>
          <p className="p-2">
            At our core, we believe your website should be a true reflection of
            your business, which is why we focus on thoroughly understanding
            your goals, brand, and customer journey before we begin. By
            tailoring our work to your specific requirements, we ensure every
            design choice, feature, and functionality aligns with your vision.
            Our collaborative approach keeps you involved at every stage,
            guaranteeing that the final result not only meets your needs but
            also elevates your online presence and drives meaningful results for
            your business.
          </p>
          <div className="btn-container">
            <button
              className="lw-btn lw-btn-fill"
              onClick={() => nav("/contact")}
            >
              Get started
            </button>
            <button
              className=" lw-btn lw-btn-outline"
              onClick={() => nav("/services")}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-right">
          <h1>LW</h1>
        </div>
      </div>
    </div>
  );
};

export default SeviceHero;
