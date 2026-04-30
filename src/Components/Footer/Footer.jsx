import React from "react";
import "./Footer.css";
import img from "../../Images/logo.jpg";
import { Link } from "react-router-dom";
import { FaInstagram, FaPhoneAlt, FaSnapchatGhost } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { ImFacebook } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Footer = () => {
  return (
    <footer className="ft-wrap">
      {/* decorative orbs */}
      <div className="ft-orb ft-orb--purple" aria-hidden="true" />
      <div className="ft-orb ft-orb--cyan" aria-hidden="true" />

      <div className="ft-inner">
        {/* ── Brand column ── */}
        <div className="ft-brand">
          <img src={img} alt="Litwebs logo" className="ft-logo" />
          <p className="ft-tagline">
            Websites that work as hard as you do — built with precision,
            launched with purpose.
          </p>
          <div className="ft-socials">
            <button
              className="ft-social-btn"
              aria-label="LinkedIn"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/litwebs/",
                  "_blank",
                )
              }
            >
              <FaLinkedin size={18} />
            </button>
            <button
              className="ft-social-btn"
              aria-label="Instagram"
              onClick={() =>
                window.open("https://www.instagram.com/litwebs/", "_blank")
              }
            >
              <FaInstagram size={18} />
            </button>
            <button
              className="ft-social-btn"
              aria-label="Facebook"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/people/Lit-Webs/61572395225801/",
                  "_blank",
                )
              }
            >
              <ImFacebook size={18} />
            </button>
            <button
              className="ft-social-btn"
              aria-label="Snapchat"
              onClick={() =>
                window.open("https://www.snapchat.com/add/litwebs", "_blank")
              }
            >
              <FaSnapchatGhost size={18} />
            </button>
          </div>
        </div>

        {/* ── Navigation column ── */}
        <div className="ft-col">
          <p className="ft-col-label">Navigation</p>
          <nav className="ft-links">
            <Link to="/" onClick={scrollTop} className="ft-link">
              <FaArrowRight className="ft-link-arrow" size={10} />
              Home
            </Link>
            <Link to="/services" onClick={scrollTop} className="ft-link">
              <FaArrowRight className="ft-link-arrow" size={10} />
              Services
            </Link>
            <Link to="/example" onClick={scrollTop} className="ft-link">
              <FaArrowRight className="ft-link-arrow" size={10} />
              Our Work
            </Link>
            <Link to="/about" onClick={scrollTop} className="ft-link">
              <FaArrowRight className="ft-link-arrow" size={10} />
              About Us
            </Link>
            <Link to="/packages" onClick={scrollTop} className="ft-link">
              <FaArrowRight className="ft-link-arrow" size={10} />
              Packages
            </Link>
            <Link to="/faqs" onClick={scrollTop} className="ft-link">
              <FaArrowRight className="ft-link-arrow" size={10} />
              FAQs
            </Link>
          </nav>
        </div>

        {/* ── Services column ── */}
        <div className="ft-col">
          <p className="ft-col-label">Services</p>
          <nav className="ft-links">
            <span className="ft-link ft-link--plain">Web Design</span>
            <span className="ft-link ft-link--plain">Web Development</span>
            <span className="ft-link ft-link--plain">E-Commerce</span>
            <span className="ft-link ft-link--plain">SEO Optimisation</span>
            <span className="ft-link ft-link--plain">Brand Identity</span>
            <span className="ft-link ft-link--plain">Maintenance</span>
          </nav>
        </div>

        {/* ── Contact column ── */}
        <div className="ft-col">
          <p className="ft-col-label">Get in Touch</p>
          <div className="ft-contact-list">
            <a
              href="tel:+447309843038"
              className="ft-contact-item"
              aria-label="Call us"
            >
              <span className="ft-contact-icon">
                <FaPhoneAlt size={14} />
              </span>
              +44 7309 843038
            </a>
            <a href="mailto:litwebs@outlook.com" className="ft-contact-item">
              <span className="ft-contact-icon">
                <MdEmail size={14} />
              </span>
              litwebs@outlook.com
            </a>
          </div>
          <Link to="/contact" onClick={scrollTop} className="ft-cta-btn">
            Start a project <FaArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          <p className="ft-copy">© 2026 Litwebs. All rights reserved.</p>
          <div className="ft-legal">
            <span className="ft-legal-link">Privacy Policy</span>
            <span className="ft-legal-sep" aria-hidden="true" />
            <span className="ft-legal-link">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
