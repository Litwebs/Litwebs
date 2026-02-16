import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import "./About.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <Header />
      <Banner title="About Litwebs" height="220px" />

      <section className="about-section max-wid2">
        <h1 className="about-title">Our story</h1>
        <p className="about-paragraph">
          Litwebs started with a simple goal: help businesses show up online
          with confidence. We saw how many great local brands had amazing
          services — but their websites didn’t reflect it, or weren’t converting
          visitors into customers.
        </p>
        <p className="about-paragraph">
          Over time, that mission became our journey: creating clean design,
          building fast and reliable websites, and supporting clients beyond
          launch with practical advice on hosting, SEO foundations, and ongoing
          improvements.
        </p>

        <div className="about-block">
          <h2 className="about-heading">Why we started</h2>
          <p className="about-paragraph">
            We noticed a pattern: businesses were spending time and money on
            ads, social media, and referrals — but when customers searched them
            and landed on their website, the experience didn’t match the quality
            of the business. Slow pages, unclear messaging, outdated design, and
            no obvious way to contact the team meant missed opportunities.
          </p>
          <p className="about-paragraph">
            Litwebs exists to fix that gap. Our focus is helping businesses look
            credible, clear, and professional online, so visitors feel confident
            reaching out.
          </p>
        </div>

        <div className="about-block">
          <h2 className="about-heading">What we do</h2>
          <p className="about-paragraph">
            We build websites that are designed to be understood quickly and to
            convert visitors into enquiries. That usually means stronger
            structure, clear calls to action, mobile-first design, and a build
            that loads fast and stays reliable.
          </p>
          <ul className="about-list">
            <li className="about-list-item">
              Design: layout, branding, UI, and responsive experience
            </li>
            <li className="about-list-item">
              Development: modern build, performance, and maintainable code
            </li>
            <li className="about-list-item">
              Redesigns: improving an existing site without losing your identity
            </li>
            <li className="about-list-item">
              SEO foundations: titles, structure, and on-page best practices
            </li>
            <li className="about-list-item">
              Hosting guidance: domains, setup, and ongoing support
            </li>
          </ul>
        </div>

        <div className="about-block">
          <h2 className="about-heading">How we work</h2>
          <p className="about-paragraph">
            We keep the process simple and collaborative. We start by
            understanding your business, your audience, and what “success” looks
            like (more enquiries, more bookings, more sales, or a stronger brand
            presence). Then we translate that into a clear structure for your
            website — what should be on the page, what should stand out, and
            what the user should do next.
          </p>
          <p className="about-paragraph">
            From there, we design, build, and refine with regular check-ins.
            Before launch we test across devices and browsers, then help you go
            live with confidence.
          </p>
        </div>

        <div className="about-block">
          <h2 className="about-heading">What you can expect</h2>
          <ul className="about-list">
            <li className="about-list-item">
              Clear communication and honest timelines
            </li>
            <li className="about-list-item">
              A website that looks professional and feels easy to use
            </li>
            <li className="about-list-item">
              Mobile-first design (because most visitors are on phones)
            </li>
            <li className="about-list-item">
              A build that’s fast, stable, and ready to grow with you
            </li>
          </ul>
        </div>

        <div className="about-block">
          <h2 className="about-heading">The Litwebs journey</h2>
          <p className="about-paragraph">
            Our journey is shaped by real client needs — from first-time
            founders launching their first brand, to established businesses
            upgrading an old site that no longer represents who they are. The
            common thread is the same: make the business recognisable,
            trustworthy, and easy to contact.
          </p>
          <p className="about-paragraph">
            If you’re at the start, we’ll guide you through the basics and help
            you get a strong online foundation. If you’re growing, we’ll help
            you tighten the message, modernise the design, and improve how your
            website performs.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
