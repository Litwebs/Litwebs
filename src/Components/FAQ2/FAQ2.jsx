import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import data from "../../Context/FAQS";
import "./FAQ2.css";
import "../util/core.css";
import "../util/colors.css";

const FAQ2 = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);
  const nav = useNavigate();
  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.maxHeight =
          openIndex === index ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [openIndex]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-client-container">
      <h2 className="faq-client-title">FAQ</h2>
      <p className="p-3">
        Get some quick answers to your questions by browsing the topics below
      </p>
      <div className="faq-client-list">
        {data.slice(11).map((item, index) => (
          <div
            key={index}
            className={`faq-client-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-client-question">
              {item.question}
              {openIndex === index ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            <div
              className="faq-client-answer-container"
              ref={(el) => (contentRefs.current[index] = el)}
            >
              <div className="faq-client-answer">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
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
      <button className="btn" onClick={() => nav("/faqs")}>
        View All FAQs
      </button>
    </div>
  );
};

export default FAQ2;
