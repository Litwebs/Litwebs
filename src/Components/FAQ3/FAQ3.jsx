import React from "react";
import Question from "./Question";
import "./FAQ3.css";

const FAQ3 = ({ data }) => {
  return (
    <section className="faq3-section">
      <div className="faq3-inner">
        {data.map((item, idx) => (
          <Question key={idx} title={item.question} para={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQ3;
