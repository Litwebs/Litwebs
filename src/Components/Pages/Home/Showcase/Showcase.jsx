import React, { useContext } from "react";
import { ContentContext } from "../../../../Context/Content/ContentState";
import { useNavigate } from "react-router-dom";
import "./Showcase.css";

const Showcase = ({ title = "Showcase", indexStart = 0, indexEnd = 6 }) => {
  const nav = useNavigate();
  const { Projects, setPro } = useContext(ContentContext);
  const onClick = (project) => {
    setPro(project);
    nav("/project");
  };
  return (
    <div className="max-wid">
      <h2
        className="t-2"
        style={{ fontWeight: "100", color: "var(--lw-text-color-7)" }}
      >
        {title}
      </h2>
      <div className="gallery-container">
        {Projects.slice(indexStart, indexEnd).map((project, index) => (
          <div
            className="project-card"
            key={index}
            onClick={() => onClick(project)}
          >
            <div className="card-inner">
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
              >
                <source src={project.video} type="video/mp4" />
              </video>
              <div className="card-overlay">
                <h3>{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="btn-con-local">
        <button
          className="lw-btn lw-btn-fill"
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
