import React from "react";
import Feature from "./Feature";
import featureData from "./data";
import "./Features.css";

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-header">
        <h2>Why Businesses Choose Us</h2>
        <p>
          Everything you need to get more clients — without the tech headache.
        </p>
      </div>
      <div className="features-con">
        {featureData.map(({ Icon, title, p }, index) => (
          <Feature key={index} Icon={Icon} title={title} p={p} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Features;
