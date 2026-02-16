import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import "./FAQHome.css";

const FAQHome = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title t-2 uppercase-text">
        Frequently asked questions
      </h2>
      {data.map((faq, index) => (
        <div
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          key={index}
          onClick={() => toggleFAQ(index)}
        >
          <div className="faq-question">
            {faq.question}
            <span className="faq-icon">
              {activeIndex === index ? <HiMiniMinusSmall /> : <GoPlus />}
            </span>
          </div>
          <div className="faq-answer">{faq.answer}</div>
        </div>
      ))}
      <p
        className="p-3"
        style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}
      >
        Still have another question?{" "}
        <Link to="/contact" style={{ textDecoration: "none", color: "#000" }}>
          Contact us
        </Link>
        .
      </p>
    </div>
  );
};

export default FAQHome;
