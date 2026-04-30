import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Banner2 from "../../Banner/Banner2";
import { ContentContext } from "../../../Context/Content/ContentState";
import Showcase from "../Home/Showcase/Showcase";
import AutoPlayVideo from "../../util/AutoPlayVideo";
import ProjectFeedStatus from "../../util/ProjectFeedStatus/ProjectFeedStatus";
import "./Project.css";

const Project = () => {
  const nav = useNavigate();
  const path = useLocation();
  const { SelectedProject, ProjectsLoading, ProjectsError, refreshProjects } =
    useContext(ContentContext);

  useEffect(() => {
    if (
      !ProjectsLoading &&
      !ProjectsError &&
      Object.keys(SelectedProject).length === 0
    ) {
      nav("/");
    }
    window.scrollTo(0, 0);
  }, [path, nav, ProjectsLoading, ProjectsError, SelectedProject]);

  const openUri = () => {
    window.open(SelectedProject.url, "_blank");
  };

  const showProjectStatus =
    ProjectsLoading ||
    ProjectsError ||
    Object.keys(SelectedProject).length === 0;

  return (
    <div>
      <Header />
      <main className="project">
        {showProjectStatus ? (
          <ProjectFeedStatus
            isLoading={ProjectsLoading}
            error={ProjectsError}
            isEmpty={
              !ProjectsLoading &&
              !ProjectsError &&
              Object.keys(SelectedProject).length === 0
            }
            onRetry={refreshProjects}
            loadingMessage="We are loading this project from the public content API."
            emptyMessage="Select a project from the showcase to view its details."
          />
        ) : (
          <>
            <section className="project-hero-card">
              <div className="project-media-shell">
                <div className="project-browser-chrome">
                  <div className="project-browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="project-browser-domain">
                    {SelectedProject.domain}
                  </span>
                </div>
                <div className="showcase-card-project" onClick={openUri}>
                  <div className="showcase-video-wrapper-project">
                    <AutoPlayVideo
                      src={SelectedProject.video}
                      className="showcase-video-project"
                      controls={false}
                    />
                  </div>
                </div>
              </div>

              <div className="project-hero-copy">
                <div className="project-card-main">
                  <div className="project-brand-lockup">
                    {SelectedProject.logoUrl && (
                      <div className="project-logo-wrap">
                        <img
                          className="project-logo"
                          src={SelectedProject.logoUrl}
                          alt={`${SelectedProject.title} logo`}
                        />
                      </div>
                    )}
                    <div>
                      <p className="project-kicker">
                        Designed and built by Litwebs
                      </p>
                      {/* <p className="project-domain-text">
                        {SelectedProject.domain}
                      </p> */}
                      <h1>{SelectedProject.title}</h1>
                    </div>
                  </div>
                </div>

                <div className="project-actions">
                  <button
                    className="project-primary-action"
                    onClick={openUri}
                    disabled={!SelectedProject.url}
                  >
                    Visit Website
                  </button>
                  <button
                    className="project-secondary-action"
                    onClick={() => nav("/contact")}
                  >
                    Start Something Similar
                  </button>
                </div>
              </div>

              <section className="project-description-section">
                <p className="project-description-label">Project Overview</p>
                <p className="project-description">
                  {SelectedProject.description}
                </p>
              </section>
            </section>
          </>
        )}
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
