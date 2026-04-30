// Showcase.jsx
import React, { useContext } from "react";
import { ContentContext } from "../../../../Context/Content/ContentState";
import { useNavigate } from "react-router-dom";
import AutoPlayVideo from "../../../util/AutoPlayVideo";
import ProjectFeedStatus from "../../../util/ProjectFeedStatus/ProjectFeedStatus";
import "./Showcase.css";

const Showcase = ({ title = "Showcase", indexStart = 0, indexEnd = 6 }) => {
  const nav = useNavigate();
  const { Projects, ProjectsLoading, ProjectsError, refreshProjects, setPro } =
    useContext(ContentContext);
  const visibleProjects = Projects.slice(indexStart, indexEnd);

  const onClick = (project) => {
    setPro(project);
    nav("/project");
  };

  return (
    <section className="showcase-section">
      <div className="showcase-header">
        <p className="showcase-eyebrow">Portfolio</p>
        <h2>Our Recent Work</h2>
        <p className="showcase-sub">
          Real websites built for real businesses. Every project is bespoke,
          fast, and built to convert.
        </p>
      </div>

      <div className="gallery-container">
        {visibleProjects.map((project, index) => (
          <div
            className="project-card"
            key={index}
            onClick={() => onClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick(project)}
          >
            <div className="card-inner">
              <div className="card-topline">
                <span className="card-tag">Website spotlight</span>
              </div>

              <AutoPlayVideo
                className="project-image"
                src={project.video}
                disablePictureInPicture
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                disableRemotePlayback
              />

              <div className="card-bottom">
                <div className="card-copy">
                  <div className="card-brand-row">
                    {project.logoUrl && (
                      <div className="card-logo-wrap">
                        <img
                          className="card-logo"
                          src={project.logoUrl}
                          alt={`${project.title} logo`}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div>
                      {/* <p className="card-kicker">Selected project</p> */}
                      <h3 className="card-title">{project.title}</h3>
                    </div>
                  </div>
                </div>
                <button
                  className="card-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick(project);
                  }}
                >
                  View details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectFeedStatus
        isLoading={ProjectsLoading}
        error={ProjectsError}
        isEmpty={
          !ProjectsLoading && !ProjectsError && visibleProjects.length === 0
        }
        onRetry={refreshProjects}
        loadingMessage="We are fetching the latest showcase projects from the public content API."
        emptyMessage="There are no published projects to show right now."
      />

      <div className="btn-con-local">
        <button
          className="lw-btn lw-btn-outline"
          onClick={() => nav("/example")}
        >
          View More
        </button>
      </div>

      <ProjectFeedStatus
        isLoading={ProjectsLoading}
        error={ProjectsError}
        isEmpty={
          !ProjectsLoading && !ProjectsError && visibleProjects.length === 0
        }
      />
    </section>
  );
};

export default Showcase;
