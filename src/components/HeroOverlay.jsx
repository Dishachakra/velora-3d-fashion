import React from "react";
import { ArrowDown, Sparkles, Compass } from "lucide-react";

export default function HeroOverlay({ onExploreClick, onOpenAtelier }) {
  const letters = ["V", "E", "L", "O", "R", "A"];

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        height: "100%",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(5rem, 9vh, 6.5rem) clamp(1rem, 3.5vw, 3.5rem) clamp(1.5rem, 4vh, 2.5rem)",
        pointerEvents: "none"
      }}
    >
      {/* Top Metadata Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          gap: "1rem"
        }}
      >
        <div style={{ pointerEvents: "auto", display: "grid", gap: "0.35rem" }}>
          <div className="editorial-badge accent">
            <Sparkles size={11} color="#00E5FF" />
            <span>N° 08 // HAUTE COUTURE</span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              maxWidth: "28ch"
            }}
          >
            PARIS // AUTUMN-WINTER 2026-27
          </p>
        </div>

        {/* Coordinates - Hidden on screens <= 1240px */}
        <div
          style={{
            pointerEvents: "auto",
            display: "none",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.25rem"
          }}
          className="hero-coord-badge"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-silver)" }}>
            <Compass size={13} />
            <span>48.8566° N, 2.3522° E</span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)" }}>
            SPECULAR REFLECTANCE: 94.2%
          </span>
        </div>
      </div>

      {/* Middle Center: Giant Stretched Wordmark + Tagline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          margin: "auto 0",
          width: "100%",
          padding: "1rem 0"
        }}
      >
        <div style={{ pointerEvents: "auto", width: "100%", overflow: "hidden" }}>
          <h1 className="velora-giant-word" aria-label="VELORA">
            {letters.map((char, index) => (
              <span
                key={index}
                style={{
                  animationDelay: `${index * 0.08}s`
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: "clamp(0.8rem, 2vh, 1.4rem)",
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
            padding: "0 0.5rem"
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "var(--text-primary)"
            }}
          >
            Wear the Unordinary.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.72rem, 1.1vw, 0.95rem)",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              maxWidth: "46ch",
              textAlign: "center",
              lineHeight: 1.5
            }}
          >
            Sculptural avant-garde silhouettes, liquid metallic drapes, and algorithmic digital couture.
          </p>
        </div>
      </div>

      {/* Bottom Action Bar: Fully responsive across 1366, 1240, 1190, 967, 768, 767, 575, 475, 390 */}
      <div
        className="hero-bottom-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
          pointerEvents: "auto",
          gap: "1.2rem"
        }}
      >
        {/* Explore Button Group */}
        <div className="hero-cta-group" style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a
            href="#collections"
            onClick={(e) => {
              e.preventDefault();
              onExploreClick();
            }}
            className="btn-luxury"
          >
            Explore Collection
          </a>
          <button
            onClick={() => onOpenAtelier("NOIR")}
            className="btn-outline hide-on-767"
          >
            Private Fitting
          </button>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#collections"
          onClick={(e) => {
            e.preventDefault();
            onExploreClick();
          }}
          className="scroll-indicator"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.65rem, 0.8vw, 0.72rem)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "color 0.3s"
          }}
        >
          <span>SCROLL TO DESCEND</span>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid rgba(245, 244, 240, 0.2)",
              display: "grid",
              placeItems: "center",
              animation: "float-subtle 2.5s infinite ease-in-out"
            }}
          >
            <ArrowDown size={13} color="#00E5FF" />
          </div>
        </a>
      </div>
    </div>
  );
}
