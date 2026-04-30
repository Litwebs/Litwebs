import React from "react";
import "./Banner.css";
import "../util/core.css";
import "../util/colors.css";
const Banner2 = ({ height = "80px", p, title, btn }) => {
  return (
    <div className="banner banner2" style={{ minHeight: height }}>
      <h1 className="t-4 max-wid">{title}</h1>
      {p && <p className="p-3 mar-top">{p}</p>}
      {btn && (
        <button className="banner2-btn" onClick={btn.onClick}>
          {btn.name}
        </button>
      )}
    </div>
  );
};

export default Banner2;
