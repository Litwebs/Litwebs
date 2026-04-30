import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import "./FAQHome.css";

const FAQHome = ({ data, title = "Frequently asked questions" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => setActiveIndex(i === activeIndex ? null : i);

  return (
    <div className="faqh-wrap">
      <h2 className="faqh-title">{title}</h2>

      <div className="faqh-list">
        {data.map((faq, i) => {
          const isOpen = activeIndex === i;
          return (
            <div
              key={i}
              className={`faqh-item${isOpen ? " faqh-item--open" : ""}`}
              onClick={() => toggle(i)}
            >
              <div className="faqh-question">
                <span className="faqh-q-text">{faq.question}</span>
                <span className="faqh-q-icon" aria-hidden="true">
                  {isOpen ? <FiMinus size={15} /> : <FiPlus size={15} />}
                </span>
              </div>
              <div
                className="faqh-answer"
                style={{ maxHeight: isOpen ? "300px" : "0px" }}
              >
                <p className="faqh-answer-text">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="faqh-footer-note">
        Still have a question?{" "}
        <Link to="/contact" className="faqh-footer-link">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
};

export default FAQHome;
