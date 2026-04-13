import React, { useContext } from "react";
import { ContentContext } from "../../../../Context/Content/ContentState";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProjectFeedStatus from "../../../util/ProjectFeedStatus/ProjectFeedStatus";
import "./ShowcaseGrid.css";

const ShowcaseGrid = () => {
  const nav = useNavigate();
  const { Projects, ProjectsLoading, ProjectsError, refreshProjects, setPro } =
    useContext(ContentContext);
  const onClick = (project) => {
    setPro(project);
    nav("/project");
  };
  return (
    <section className="showcase-wrapper">
      <div className="showcase-header">
        <h2>Showcase</h2>
        <p>Companies choose LITWEBS to achieve their vision</p>
      </div>

      <div className="showcase-grid">
        {Projects.map((item, index) => (
          <div
            className="showcase-card"
            key={index}
            onClick={() => onClick(item)}
          >
            <div className="showcase-card-meta">
              <span className="showcase-domain">{item.domain}</span>
            </div>
            <div className="showcase-video-wrapper">
              <video
                src={item.video}
                muted
                loop
                autoPlay
                playsInline
                className="showcase-video"
              />
            </div>
            <div className="showcase-card-copy">
              <div className="showcase-brand-row">
                {item.logoUrl && (
                  <div className="showcase-logo-wrap">
                    <img
                      className="showcase-logo"
                      src={item.logoUrl}
                      alt={`${item.title} logo`}
                      loading="lazy"
                    />
                  </div>
                )}
                <span className="sub-con">
                  <h3>{item.title}</h3>
                  <IoIosArrowForward
                    size={14}
                    className="show-arrow"
                    color="var(--lw-text-color-7)"
                  />
                </span>
              </div>
              <p className="showcase-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <ProjectFeedStatus
        isLoading={ProjectsLoading}
        error={ProjectsError}
        isEmpty={!ProjectsLoading && !ProjectsError && Projects.length === 0}
        onRetry={refreshProjects}
        loadingMessage="We are loading the full project catalogue from the public content API."
        emptyMessage="There are no published project examples available right now."
      />
    </section>
  );
};

export default ShowcaseGrid;
