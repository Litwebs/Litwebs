import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import {
  FaPaintBrush,
  FaCode,
  FaStar,
  FaQrcode,
  FaSearch,
  FaBullhorn,
  FaServer,
  FaSyncAlt,
  FaArrowRight,
} from "react-icons/fa";
import "./Services.css";

const services = [
  {
    Icon: FaPaintBrush,
    title: "Web Design",
    description:
      "Modern, conversion-focused design that reflects your brand and makes it effortless for customers to take action.",
    color: "purple",
  },
  {
    Icon: FaCode,
    title: "Web Development",
    description:
      "Fast, reliable builds with clean code — from lean landing pages to full multi-page business websites.",
    color: "cyan",
  },
  {
    Icon: FaStar,
    title: "Logo Design",
    description:
      "Simple, memorable logos that look great across your website, socials, signage, and print.",
    color: "pink",
  },
  {
    Icon: FaQrcode,
    title: "QR Code Generator",
    description:
      "Custom-branded QR codes that link customers straight to your booking page, menu, or website.",
    color: "amber",
  },
  {
    Icon: FaSearch,
    title: "SEO Optimisation",
    description:
      "On-page SEO foundations so your site is easier to discover and performs better in search results.",
    color: "green",
  },
  {
    Icon: FaBullhorn,
    title: "Meta Ads",
    description:
      "Campaign setup and optimisation to help you reach the right customers on Facebook and Instagram.",
    color: "pink",
  },
  {
    Icon: FaServer,
    title: "Hosting",
    description:
      "Secure, dependable hosting setup with guidance on custom domains and ongoing technical support.",
    color: "cyan",
  },
  {
    Icon: FaSyncAlt,
    title: "Website Redesign",
    description:
      "Refresh an existing site with improved visuals, clearer messaging, and better performance.",
    color: "purple",
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery call",
    body: "We learn about your business, goals, and audience in a short free call.",
  },
  {
    num: "02",
    title: "Proposal & quote",
    body: "You receive a clear scope, timeline, and fixed price — no surprises.",
  },
  {
    num: "03",
    title: "Design & build",
    body: "We design and develop your site with regular updates and your feedback.",
  },
  {
    num: "04",
    title: "Launch & support",
    body: "We go live and stay on hand for any questions, tweaks, or future work.",
  },
];

const Services = () => {
  const nav = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page">
      <Header />

      {/* ── Hero ── */}
      <section className="srv-hero">
        <div className="srv-hero-orb srv-orb-1" />
        <div className="srv-hero-orb srv-orb-2" />
        <div className="srv-hero-inner">
          <span className="srv-eyebrow">What we offer</span>
          <h1 className="srv-hero-h1">
            Everything your business
            <br />
            needs to <span className="srv-grad-text">grow online</span>
          </h1>
          <p className="srv-hero-sub">
            From brand identity and web design to SEO, ads, and hosting — we
            cover every layer of your online presence so you can focus on
            running your business.
          </p>
          <button className="srv-cta-btn" onClick={() => nav("/contact")}>
            Get a free quote <FaArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* ── Service cards ── */}
      <section className="srv-cards-section">
        <div className="srv-cards-grid">
          {services.map(({ Icon, title, description, color }) => (
            <div key={title} className={`srv-card srv-card--${color}`}>
              <div className="srv-card-icon">
                <Icon size={22} />
              </div>
              <h3 className="srv-card-title">{title}</h3>
              <p className="srv-card-desc">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="srv-process-section">
        <div className="srv-process-inner">
          <span className="srv-eyebrow">How it works</span>
          <h2 className="srv-section-h2">Simple process, zero guesswork</h2>
          <div className="srv-steps">
            {steps.map(({ num, title, body }) => (
              <div key={num} className="srv-step">
                <span className="srv-step-num">{num}</span>
                <h4 className="srv-step-title">{title}</h4>
                <p className="srv-step-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="srv-cta-section">
        <div className="srv-cta-orb" />
        <div className="srv-cta-inner">
          <h2 className="srv-cta-h2">Ready to get started?</h2>
          <p className="srv-cta-sub">
            Tell us about your project and we'll put together a free,
            no-obligation quote.
          </p>
          <div className="srv-cta-btns">
            <button className="srv-cta-btn" onClick={() => nav("/contact")}>
              Contact us <FaArrowRight size={13} />
            </button>
            <button
              className="srv-cta-btn-ghost"
              onClick={() => nav("/packages")}
            >
              View packages
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
