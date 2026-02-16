import React, { useEffect } from "react";
import Banner from "../../Banner/Banner";
import Banner2 from "../../Banner/Banner2";
import Header from "../../Header/Header";
import Features from "../../Features/Features";
import FAQHome from "../../Pages/Home/FAQHome/FAQHome";
import Footer from "../../Footer/Footer";
import data from "../../../Context/FAQS";
import "./Example.css";
import ShowcaseGrid from "./ShowcaseGrid/ShowcaseGrid";
import { useNavigate } from "react-router-dom";

const Example = () => {
  const nav = useNavigate();
  //Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="example">
      <Header />
      <Banner title="Our Work" height="200px" />
      <h1 className="t-1">Examples of OUR PROJECTS</h1>
      <ShowcaseGrid />
      <Banner2
        height="140px"
        title="Ready to get Started? Choose a package suitable for your business"
        btn={{ name: "Get Started!", onClick: () => nav("/contact") }}
      />
      <Features />
      <FAQHome data={data.slice(8)} />
      <Footer />
    </div>
  );
};

export default Example;
