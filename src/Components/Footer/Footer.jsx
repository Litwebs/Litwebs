import React from "react";
import "../util/core.css";
import "../util/colors.css";
import "./Footer.css";
import img from "../../Images/logo.jpg";
import { ImFacebook } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSnapchatGhost } from "react-icons/fa";
import { Link as LinkRouter } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer-con ">
      <div className="footer max-wid">
        <div className="item">
          <img src={img} alt="" className="soft-shadow" />
          <div className="socials-footer">
            <FaLinkedin
              className="icon"
              size={26}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/litwebs/",
                  "_blank",
                )
              }
            />
            <FaInstagram
              className="icon"
              size={26}
              onClick={() =>
                window.open("https://www.instagram.com/litwebs/", "_blank")
              }
            />
            <ImFacebook
              className="icon"
              size={26}
              onClick={() =>
                window.open(
                  "https://www.facebook.com/people/Lit-Webs/61572395225801/",
                  "_blank",
                )
              }
            />
            <FaSnapchatGhost
              className="icon"
              size={26}
              onClick={() =>
                window.open("https://www.snapchat.com/add/litwebs", "_blank")
              }
            />
          </div>
        </div>
        <div className="item">
          <h2 className="title-4">Contact</h2>
          <div className="sec">
            <a
              className="p-5"
              href="tel:+447309843038"
              style={{ display: "inline-block" }}
              aria-label="Call us at +44 7309 843038"
            >
              <FaPhoneAlt size={16} style={{ marginRight: 8 }} />
              +44 7309 843038
            </a>
            <p
              className="p-5"
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                window.open("mailto:litwebs@outlook.co.uk", "_blank")
              }
            >
              <MdEmail size={16} style={{ marginRight: 8 }} />
              Litwebs@outlook.com
            </p>
          </div>
        </div>
        <div className="item">
          <h2 className="title-4">Links</h2>
          <div className="sec">
            <Link className="p-5" to="/" onClick={() => window.scrollTo(0, 0)}>
              Home
            </Link>

            <Link
              className="p-5"
              to="/services"
              onClick={() => window.scrollTo(0, 0)}
            >
              Services
            </Link>

            <Link
              className="p-5"
              to="/example"
              onClick={() => window.scrollTo(0, 0)}
            >
              Our Work
            </Link>
            <Link
              className="p-5"
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
            >
              About us
            </Link>
            <Link
              className="p-5"
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
            >
              Contact us
            </Link>
          </div>
        </div>
        <div className="item">
          <h2 className="title-4">More Links</h2>
          <div className="sec">
            <LinkRouter
              className="p-5"
              to="/services"
              onClick={() => window.scrollTo(0, 0)}
            >
              Services
            </LinkRouter>
            <LinkRouter
              className="p-5"
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
            >
              About us
            </LinkRouter>
            <LinkRouter className="p-5" to="/faqs">
              FAQs
            </LinkRouter>
          </div>
        </div>
      </div>
      <div className="end">
        <p className="p-5">© 2026 Litwebs. All rights reserved.</p>
        <p className="p-5">Privacy Policy</p>
        <p className="p-5">Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
