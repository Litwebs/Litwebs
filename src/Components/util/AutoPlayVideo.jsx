import React, { useEffect, useRef } from "react";

const AutoPlayVideo = ({ src, children, className, ...props }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return undefined;
    }

    const ensurePlayback = () => {
      videoElement.muted = true;
      videoElement.defaultMuted = true;
      videoElement.playsInline = true;
      videoElement.setAttribute("muted", "");
      videoElement.setAttribute("playsinline", "true");
      videoElement.setAttribute("webkit-playsinline", "true");

      const playAttempt = videoElement.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    };

    ensurePlayback();
    videoElement.addEventListener("loadedmetadata", ensurePlayback);
    videoElement.addEventListener("canplay", ensurePlayback);

    return () => {
      videoElement.removeEventListener("loadedmetadata", ensurePlayback);
      videoElement.removeEventListener("canplay", ensurePlayback);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      {...props}
    >
      {children}
    </video>
  );
};

export default AutoPlayVideo;
