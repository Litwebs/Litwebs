// Showcase.jsx
import React, { useContext } from "react";
import { ContentContext } from "../../../../Context/Content/ContentState";
import { useNavigate } from "react-router-dom";
import "./Showcase.css";

const Showcase = ({ title = "Showcase", indexStart = 0, indexEnd = 4 }) => {
  const nav = useNavigate();
  const { Projects, setPro } = useContext(ContentContext);

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
      </div>

      <div className="gallery-container">
        {Projects.slice(indexStart, indexEnd).map((project, index) => (
          <div
            className="project-card"
            key={index}
            onClick={() => onClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick(project)}
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
                preload="metadata"
              >
                <source src={project.video} type="video/mp4" />
              </video>

              {/* Seamless bottom fade + title always */}
              <div className="card-bottom">
                <div>
                  <h3 className="card-title">{project.title}</h3>
                  <h5 className="card-sub-title">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Explicabo, officia?
                  </h5>
                </div>
                {/* Button only on hover */}
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
