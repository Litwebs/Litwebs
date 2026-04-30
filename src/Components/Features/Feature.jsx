import React from "react";
import "./Features.css";

const Feature = ({ Icon, p, title, index }) => {
  return (
    <div className="feature" data-color={index % 6}>
      <div className="feature-icon-wrap">
        <Icon className="icon" />
      </div>
      <p className="feature-title">{title}</p>
      <p className="feature-desc">{p}</p>
    </div>
  );
};

export default Feature;
