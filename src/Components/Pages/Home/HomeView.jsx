import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeView.css";

const badges = [
  { emoji: "⚡", label: "Live in 14 Days" },
  { emoji: "🇬🇧", label: "UK Based" },
  { emoji: "⭐", label: "5-Star Rated" },
];

const HomeView = () => {
  const nav = useNavigate();
  return (
    <div className="home-view">
      {/* Ambient glow orbs */}
      <div className="hv-orb hv-orb-1" />
      <div className="hv-orb hv-orb-2" />
      <div className="hv-orb hv-orb-3" />
      {/* Noise texture overlay */}
      <div className="hv-noise" />

      <div className="content">
        {/* Floating proof badges */}
        <div className="hv-badges">
          {badges.map((b) => (
            <span key={b.label} className="hv-badge">
              {b.emoji} {b.label}
            </span>
          ))}
        </div>

        <h1>
          Get a Website That
          <br />
          <span className="animated-gradient-text">Brings You Clients</span>
          <br />
          in 14 Days
        </h1>

        <p className="hv-sub">
          We build fast, conversion-focused websites that turn visitors into
          paying customers — not just look pretty. Trusted by businesses across
          the UK.
        </p>

        {/* Video placeholder — drop your video src here */}
        <div className="hv-video-wrap">
          <div className="hv-video-glow" />
          <div className="hv-video-placeholder">
            <div className="hv-play-btn" aria-label="Play intro video">
              <div className="hv-play-ring" />
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="32"
                height="32"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="hv-video-label">Your intro video — coming soon</p>
          </div>
        </div>

        <div className="hv-cta-row">
          <button className="hv-btn-primary" onClick={() => nav("/contact")}>
            <span>Book a Free Call</span>
            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="hv-btn-secondary" onClick={() => nav("/contact")}>
            Get a Free Audit
          </button>
        </div>

        <div className="hv-trust-row">
          <span className="hv-trust-dot" />
          <p className="hv-trust">
            No commitment &nbsp;·&nbsp; 100% free &nbsp;·&nbsp; Reply within 24h
          </p>
          <span className="hv-trust-dot" />
        </div>

        {/* Scroll cue */}
        <div className="hv-scroll-cue" aria-hidden="true">
          <div className="hv-scroll-wheel" />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
