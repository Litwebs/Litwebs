import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import FAQHome from "../../Pages/Home/FAQHome/FAQHome";
import data from "../../../Context/FAQS";
import "./Example.css";
import ShowcaseGrid from "./ShowcaseGrid/ShowcaseGrid";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Example = () => {
  const nav = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="example">
      <Header />

      {/* ── Hero ── */}
      <section className="ex-hero">
        <div className="ex-orb ex-orb-1" />
        <div className="ex-orb ex-orb-2" />
        <div className="ex-hero-inner">
          <span className="ex-eyebrow">Portfolio</span>
          <h1 className="ex-hero-h1">
            Real work,
            <br />
            <span className="ex-grad-text">real results</span>
          </h1>
          <p className="ex-hero-sub">
            Every project here represents a business that trusted us to build
            their online presence. Browse our latest work and see the quality we
            deliver across every industry.
          </p>
          <button className="ex-cta-btn" onClick={() => nav("/contact")}>
            Start your project <FaArrowRight size={13} />
          </button>
        </div>
      </section>

      <ShowcaseGrid />

      {/* ── CTA strip ── */}
      <section className="ex-cta-strip">
        <div className="ex-strip-orb" />
        <div className="ex-strip-inner">
          <h2 className="ex-strip-h2">Like what you see?</h2>
          <p className="ex-strip-sub">
            Let's build something great together — tell us about your project
            and we'll get back to you fast.
          </p>
          <div className="ex-strip-btns">
            <button className="ex-cta-btn" onClick={() => nav("/contact")}>
              Get in touch <FaArrowRight size={13} />
            </button>
            <button className="ex-ghost-btn" onClick={() => nav("/packages")}>
              View packages
            </button>
          </div>
        </div>
      </section>

      <FAQHome data={data.slice(8)} />
      <Footer />
    </div>
  );
};

export default Example;
