// Showcase.jsx
import React, { useContext } from "react";
import { ContentContext } from "../../../../Context/Content/ContentState";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ProjectFeedStatus from "../../../util/ProjectFeedStatus/ProjectFeedStatus";
import "./Showcase.css";

const Showcase = ({ title = "Showcase", indexStart = 0, indexEnd = 4 }) => {
  const nav = useNavigate();
  const { Projects, ProjectsLoading, ProjectsError, refreshProjects, setPro } =
    useContext(ContentContext);
  const visibleProjects = Projects.slice(indexStart, indexEnd);

  const onClick = (project) => {
    setPro(project);
    nav("/project");
  };

  return (
    <div className="max-wid">
      <div className="hero-left">
        <h1 className="t-2" style={{ margin: "4rem 0 2rem 0" }}>
          {" "}
          {/* Why choose our services` */}
          OUR RECENT WORK
        </h1>
        <p className="p-2" style={{ textAlign: "center" }}>
          At our core, we believe your website should be a true reflection of
          your business, which is why we focus on thoroughly understanding your
          goals, brand, and customer journey before we begin. By tailoring our
          work to your specific requirements.
        </p>

        <div className="showcase-contact" aria-label="Contact details">
          <a
            className="showcase-contact-link"
            href="tel:+447309843038"
            aria-label="Call us at +44 7309 843038"
          >
            <FaPhoneAlt size={14} style={{ marginRight: 8 }} />
            +44 7309 843038
          </a>
          <a
            className="showcase-contact-link"
            href="mailto:litwebs@outlook.co.uk"
            aria-label="Email us at litwebs@outlook.co.uk"
          >
            <MdEmail size={16} style={{ marginRight: 8 }} />
            litwebs@outlook.co.uk
          </a>
        </div>
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

              <video
                className="project-image"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                disableRemotePlayback
                preload="metadata"
              >
                <source src={project.video} type="video/mp4" />
              </video>

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
          style={{ margin: "0 auto" }}
          onClick={() => nav("/example")}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default Showcase;
