import React from "react";
import Question from "./Question";
import { useNavigate, Link } from "react-router-dom";
import "./FAQ1.css";

const FAQ1 = ({ data }) => {
  const nav = useNavigate();
  return (
    <div className="faq1-con">
      <div className="faq1 max-wid">
        <h1>FAQ</h1>
        <p>
          Get some quick answers to your questions by browsing the topics below
        </p>
        <div className="ques-con">
          {data.map((item, idx) => (
            <Question key={idx} title={item.question} ans={item.answer} />
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
        <div className="btn-con">
          <button className="btn" onClick={() => nav("/faqs")}>
            View All FAQs
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ1;
