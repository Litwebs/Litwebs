import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Banner from "../../Banner/Banner";
import Banner2 from "../../Banner/Banner2";
import HeroR from "../../HeroR/HeroR";
import Footer from "../../Footer/Footer";
import { CgComment } from "react-icons/cg";
import { TbReportSearch } from "react-icons/tb";
import { PiShoppingCart } from "react-icons/pi";
import { BiPaint } from "react-icons/bi";
import { GoTools } from "react-icons/go";
import { GrTest } from "react-icons/gr";
import { PiRocketLaunch } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import FAQ2 from "../../FAQ2/FAQ2";
import "./Process.css";

const Process = () => {
  const nav = useNavigate();
  const data = [
    {
      Step: "Choose package",
      Icon: PiShoppingCart,
      Description:
        "Select a package that fits your needs, whether it’s a simple one-page site or a full e-commerce platform. We offer options for different budgets and business types, and if you need help deciding, our team is happy to guide you.",
    },
    {
      Step: "Tell Us About Your Business",
      Icon: CgComment,
      Description:
        "We want to understand your business, target audience, and goals. This helps us create a website that reflects your brand and effectively communicates your message. Whether you have a clear vision or need suggestions, we’ll tailor the site to your needs.",
    },
    {
      Step: "Research & Strategic Planning",
      Icon: TbReportSearch,
      Description:
        "We conduct research on your industry, competitors, and audience to develop a solid plan. This includes structuring the site, outlining key features, and ensuring a smooth user experience before moving forward with the design.",
    },
    {
      Step: "Design – Bringing Your Vision to Life",
      Icon: BiPaint,
      Description:
        "Our designers create a professional and visually appealing layout that aligns with your brand. We focus on branding, colors, typography, and mobile responsiveness to ensure an engaging and user-friendly experience.",
    },
    {
      Step: "Build – Turning Design into Reality",
      Icon: GoTools,
      Description:
        "Once the design is approved, our developers build a fully functional website. We integrate all required features, optimize performance, and ensure the site is secure, fast, and responsive on all devices.",
    },
    {
      Step: "Final Review & Testing",
      Icon: GrTest,
      Description:
        "Before launch, we test for bugs, broken links, and performance across devices and browsers. You’ll have the chance to review the site and request final adjustments to ensure everything is perfect.",
    },
    {
      Step: "Launch – Your Website Goes Live!",
      Icon: PiRocketLaunch,
      Description:
        "We handle the launch process, including domain setup, hosting, and security. Your website goes live, fully optimised and ready to engage visitors. We remain available for post-launch support if needed",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="process">
      <Header />
      <Banner title="How It Works" height="200px" />
      <h1 className="t-2" style={{ marginTop: "5rem" }}>
        Our Process
      </h1>
      <p className="p">
        We like to keep things simple and find this formula works!
      </p>
      {data.map((item, idx) => (
        <HeroR
          key={idx}
          Icon={item.Icon}
          Title={item.Title}
          Description={item.Description}
          isLeft={idx % 2 !== 0}
        />
      ))}
      <Banner2
        height="200px"
        title="Ready to get Started? Choose a package suitable for your business"
        btn={{ name: "Get Started!", onClick: () => nav("/contact") }}
      />
      <FAQ2 />
      <Footer />
    </div>
  );
};

export default Process;
