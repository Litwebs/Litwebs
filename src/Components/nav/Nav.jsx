import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import "./Nav.css";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "Our Work", to: "/example" },
  { name: "About", to: "/about" },
];

const Nav = ({ isShow, setShow }) => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isShow);
    return () => document.body.classList.remove("no-scroll");
  }, [isShow]);

  const close = () => setShow(false);
  const handleLink = () => {
    close();
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`nav-backdrop ${isShow ? "active" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={`nav ${isShow ? "active" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header row */}
        <div className="nav-header">
          <span className="nav-brand">Menu</span>
          <button className="nav-close" onClick={close} aria-label="Close menu">
            <FiX size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="nav-links">
          {navLinks.map(({ name, to }) => (
            <Link
              key={to}
              className={`nav-item ${location.pathname === to ? "nav-item--active" : ""}`}
              to={to}
              onClick={handleLink}
            >
              <span>{name}</span>
              <FaArrowRight size={11} className="nav-item-arrow" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="nav-cta">
          <Link className="nav-cta-btn" to="/contact" onClick={handleLink}>
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
