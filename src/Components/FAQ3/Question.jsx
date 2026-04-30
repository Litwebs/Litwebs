import React, { useState, useRef } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import "./Question.css";

const Question = ({ title, para }) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <div className={`faqq-item${open ? " faqq-item--open" : ""}`}>
      <button
        className="faqq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="faqq-text">{title}</span>
        <span className="faqq-icon" aria-hidden="true">
          {open ? <FiMinus size={16} /> : <FiPlus size={16} />}
        </span>
      </button>
      <div
        className="faqq-body"
        ref={bodyRef}
        style={{
          maxHeight: open
            ? bodyRef.current
              ? bodyRef.current.scrollHeight + "px"
              : "500px"
            : "0px",
        }}
      >
        <p className="faqq-body-text">{para}</p>
      </div>
    </div>
  );
};

export default Question;
