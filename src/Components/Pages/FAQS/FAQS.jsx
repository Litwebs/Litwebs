import React, { useEffect } from "react";
import Header from "../../Header/Header";
import FAQ3 from "../../FAQ3/FAQ3";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./FAQS.css";
import FaqQues from "../../../Context/FAQS";
import { FaArrowRight } from "react-icons/fa";

const FAQS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const nav = useNavigate();

  return (
    <div className="faq-page">
      <Header />

      {/* ── Hero ── */}
      <section className="faq-hero">
        <div className="faq-orb faq-orb--purple" aria-hidden="true" />
        <div className="faq-orb faq-orb--cyan" aria-hidden="true" />
        <div className="faq-hero-inner">
          <span className="faq-eyebrow">Support</span>
          <h1 className="faq-hero-h1">
            Got <span className="faq-grad-text">questions?</span>
            <br />
            We've got answers.
          </h1>
          <p className="faq-hero-sub">
            Everything you need to know about working with Litwebs — from first
            contact to launch and beyond.
          </p>
        </div>
      </section>

      {/* ── Accordion ── */}
      <FAQ3 data={FaqQues} />

      {/* ── CTA strip ── */}
      <section className="faq-cta">
        <div className="faq-cta-orb" aria-hidden="true" />
        <div className="faq-cta-inner">
          <h2 className="faq-cta-h2">Still have a question?</h2>
          <p className="faq-cta-sub">
            Our team is happy to help — reach out any time.
          </p>
          <div className="faq-cta-btns">
            <button
              className="faq-cta-btn-fill"
              onClick={() => nav("/contact")}
            >
              Contact us <FaArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQS;
