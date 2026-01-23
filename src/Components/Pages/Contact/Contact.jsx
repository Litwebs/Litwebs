// Contact.jsx (small polish only)
import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import ContactForm from "./ContactForm";
import Footer from "../../Footer/Footer";
import faqs from "../../../Context/FAQS";
import FAQHome from "../Home/FAQHome/FAQHome";
import "./Contact.css";

const Contact = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="contact">
      <Header />
      <Banner height="220px" title="What can we help you with?" />

      <section className="contact-section max-wid2">
        <div className="contact-intro">
          <h1 className="contact-title">Contact us regarding your queries</h1>
          <p className="contact-subtitle">
            Got a question about one of our packages? Already have a website and
            want to improve it? Or just want to say hi — fill in the form and
            we’ll get back to you as soon as we can.
          </p>
        </div>
      </section>

      <ContactForm />
      <FAQHome data={faqs.slice(0, 10)} />
      <Footer />
    </div>
  );
};

export default Contact;
