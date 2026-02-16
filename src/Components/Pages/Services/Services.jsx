import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import "./Services.css";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Web Design",
      description:
        "Modern, responsive design that reflects your brand and makes it easy for customers to take action.",
    },
    {
      title: "Web Development",
      description:
        "Fast, reliable builds with clean code — from landing pages to full business websites.",
    },
    {
      title: "Logo Design",
      description:
        "Simple, memorable logos that look great across your website, socials, and print.",
    },
    {
      title: "QR Code Generator",
      description:
        "Automation tools to speed up repetitive tasks and help you ship faster.",
    },
    {
      title: "SEO Optimisation",
      description:
        "On-page SEO foundations so your site is easier to discover and performs better in search.",
    },
    {
      title: "Meta Ads",
      description:
        "Campaign setup and optimisation to help you reach the right customers on Facebook and Instagram.",
    },
    {
      title: "Hosting",
      description:
        "Secure, dependable hosting setup with guidance on domains and ongoing support.",
    },
    {
      title: "Website Redesign",
      description:
        "Refresh an existing site with improved visuals, clearer messaging, and better performance.",
    },
  ];

  return (
    <div className="services-page">
      <Header />
      <Banner title="Services" height="220px" />

      <section className="services-section max-wid2">
        <h1 className="services-title">What we can help you with</h1>
        <p className="services-subtitle">
          From brand and design to build, launch, and growth — we offer
          end-to-end services to help your business stand out online.
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
