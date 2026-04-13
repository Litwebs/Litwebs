import React from "react";
import "./ProjectFeedStatus.css";

const ProjectFeedStatus = ({
  isLoading = false,
  error = "",
  isEmpty = false,
  onRetry,
  loadingMessage = "Loading website content...",
  emptyMessage = "No website content is available right now.",
}) => {
  if (!isLoading && !error && !isEmpty) {
    return null;
  }

  return (
    <div
      className={`project-feed-status ${error ? "is-error" : ""} ${
        isLoading ? "is-loading" : ""
      }`}
      role={error ? "alert" : "status"}
      aria-live="polite"
    >
      <div className="project-feed-status__content">
        <h3>
          {isLoading
            ? "Fetching latest work"
            : error
              ? "Website content is unavailable"
              : "No projects to show yet"}
        </h3>
        <p>{isLoading ? loadingMessage : error ? error : emptyMessage}</p>
      </div>

      {error && onRetry && (
        <button className="project-feed-status__button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};

export default ProjectFeedStatus;
