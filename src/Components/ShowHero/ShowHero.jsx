import React, { useContext } from "react";
import "./ShowHero.css";
import { useNavigate } from "react-router-dom";
import { ContentContext } from "../../Context/Content/ContentState";
import AutoPlayVideo from "../util/AutoPlayVideo";

const ShowHero = ({ project, reverse = false }) => {
  const nav = useNavigate();
  const { setPro } = useContext(ContentContext);

  if (!project) {
    return null;
  }

  const onClick = (project) => {
    setPro(project);
    nav("/project");
  };
  return (
    <div className="max-wid">
      <section className={`showhero-container ${reverse ? "reverse" : ""}`}>
        <div className="showhero-right">
          <AutoPlayVideo
            className="showhero-video"
            src={project.video}
            controls={false}
          />
        </div>
        <div className="showhero-left">
          <div className="showhero-brand-row">
            {project.logoUrl && (
              <div className="showhero-logo-wrap">
                <img
                  className="showhero-logo"
                  src={project.logoUrl}
                  alt={`${project.title} logo`}
                  loading="lazy"
                />
              </div>
            )}
            <div className="showhero-meta-copy">
              <p className="showhero-kicker">Website spotlight</p>
              <p className="showhero-domain">{project.domain}</p>
            </div>
          </div>
          <h1>{project.title}</h1>
          <p className="description">{project.description}</p>

          <button
            className="lw-btn lw-btn-fill"
            style={{ marginRight: "10px" }}
            onClick={() => onClick(project)}
          >
            Find out more
          </button>
          <button
            className="lw-btn lw-btn-outline"
            disabled={!project.url}
            onClick={() => window.open(project.url, "_blank")}
          >
            Live Preview
          </button>
        </div>
      </section>
    </div>
  );
};

export default ShowHero;
