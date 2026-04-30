import React, { useEffect } from "react";
import Header from "../../Header/Header";
import HomeView from "./HomeView";
import Features from "../../Features/Features";
import Showcase from "./Showcase/Showcase";
import Reviews from "./Reviews/Reviews";
import LeadCapture from "../../LeadCapture/LeadCapture";
import Footer from "../../Footer/Footer";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      {/* 1. Sticky nav */}
      <Header />

      {/* 2. Hero — headline, video placeholder, CTA */}
      <HomeView />

      {/* 3. Benefits */}
      <Features />

      {/* 4. Social proof — case studies / recent work */}
      <Showcase />

      {/* 5. Testimonials */}
      <Reviews />

      {/* 6. Lead capture — name / email / phone */}
      <LeadCapture />

      <Footer />
    </div>
  );
};

export default Home;
