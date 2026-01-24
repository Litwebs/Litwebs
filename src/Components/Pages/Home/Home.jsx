import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import Banner2 from "../../Banner/Banner2";
import Features from "../../Features/Features";
import Footer from "../../Footer/Footer";
import FAQHome from "./FAQHome/FAQHome";
import { useNavigate } from "react-router-dom";
import faqs from "../../../Context/FAQS";
import ServiceHero from "../../SeviceHero/SeviceHero";
import HomeView from "./HomeView";
import Reviews from "./Reviews/Reviews";
import Showcase from "./Showcase/Showcase";
import ContactForm from "../Contact/ContactForm";
import "./Home.css";

const Home = () => {
  const nav = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = faqs.slice(0, 8);
  return (
    <div className="home">
      <Header />
      <HomeView />
      <Banner title="Helping Businesses reach their potential" height="200px" />
      <Showcase />
      <Features />
      <ServiceHero />

      <ContactForm />
      <Reviews />
      <Banner2
        height="140px"
        title="Ready to get Started? Choose a package suitable for your business"
        btn={{ name: "Get Started!", onClick: () => nav("/contact") }}
      />
      <FAQHome data={data} />
      <Footer />
    </div>
  );
};

export default Home;
