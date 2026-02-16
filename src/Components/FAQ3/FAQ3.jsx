import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Question from "./Question";
import "../util/core.css";
import "../util/colors.css";
import "./FAQ3.css";

const FAQ3 = ({ data }) => {
  return (
    <Fragment>
      <div className="max-wid">
        <div className="faq3">
          {data.map((item, idx) => (
            <Question key={idx} title={item.question} para={item.answer} />
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
      </div>
    </Fragment>
  );
};

export default FAQ3;
