import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Banner2 from "../../Banner/Banner2";
import { ContentContext } from "../../../Context/Content/ContentState";
import Showcase from "../Home/Showcase/Showcase";
import "./Project.css";

const Project = () => {
  const nav = useNavigate();
  const path = useLocation();
  const { SelectedProject } = useContext(ContentContext);
  useEffect(() => {
    if (Object.keys(SelectedProject).length === 0) {
      nav("/");
      console.log(SelectedProject);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [path]);
  const openUri = () => {
    window.open(SelectedProject.url, "_blank");
  };
  return (
    <div>
      <Header />
      <main className="project">
        <h1>{SelectedProject.title}</h1>
        <div className="showcase-card-project" onClick={openUri}>
          <div className="showcase-video-wrapper-project">
            <video
              src={SelectedProject.video}
              muted
              loop
              autoPlay
              playsInline
              className="showcase-video-project"
            />
          </div>
          <h4>{SelectedProject.description}</h4>
          {SelectedProject.url && (
            <h2 onClick={openUri}>
              Visit <strong>{SelectedProject.title}</strong>
            </h2>
          )}
        </div>
      </main>
      <Banner2
        height="140px"
        title="Ready to get Started? Choose a package suitable for your business"
        btn={{ name: "Get Started!", onClick: () => nav("/contact") }}
      />
      <Showcase title="More Projects" indexStart={3} indexEnd={6} />
      <Footer />
    </div>
  );
};

export default Project;
