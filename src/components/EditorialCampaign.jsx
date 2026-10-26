import React, { useState } from "react";
import { Camera, Maximize2, X, ArrowUpRight } from "lucide-react";
import { CAMPAIGNS } from "../data/fashionData";

export default function EditorialCampaign({ onOpenAtelier }) {
  const [activeLightbox, setActiveLightbox] = useState(null);

  return (
    <section
      id="editorial"
      style={{
        position: "relative",
        backgroundColor: "var(--bg-secondary)",
        padding: "clamp(4rem, 8vh, 7rem) clamp(1rem, 3.5vw, 3.5rem)",
        borderTop: "1px solid rgba(245, 244, 240, 0.08)",
        overflow: "hidden",
        width: "100%"
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "1.5rem",
          marginBottom: "clamp(3rem, 6vw, 5rem)"
        }}
      >
        <div>
          <div className="editorial-badge accent" style={{ marginBottom: "0.85rem" }}>
            <Camera size={12} />
            <span>GLOBAL CAMPAIGN ARCHIVE</span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 5vw, 5.2rem)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.02em"
            }}
          >
            Editorial Stories
          </h2>
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)",
            color: "var(--text-muted)",
            maxWidth: "42ch",
            lineHeight: 1.6
          }}
        >
          High-fashion photography exploring the aerodynamic fluidity, nocturnal architecture, and ancestral technologies of VELORA.
        </p>
      </div>

      {/* Editorial Stories List */}
      <div style={{ display: "grid", gap: "clamp(4rem, 9vh, 7rem)" }}>
        {CAMPAIGNS.map((story, index) => {
          const isReversed = index % 2 === 1;

          return (
            <div
              key={story.id}
              className="grid-12-col"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "clamp(1.5rem, 3vw, 3rem)",
                alignItems: "center",
                width: "100%"
              }}
            >
              {/* Image Collage Side */}
              <div
                className="responsive-stack-967 col-span-12 lg:col-span-7"
                style={{
                  gridColumn: "span 12",
                  order: isReversed ? 2 : 1,
                  position: "relative",
                  width: "100%"
                }}
              >
                <div style={{ position: "relative" }}>
                  {/* Main Large Visual */}
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "16 / 11",
                      overflow: "hidden",
                      border: "1px solid rgba(245, 244, 240, 0.15)",
                      boxShadow: "0 25px 70px rgba(0, 0, 0, 0.7)",
                      cursor: "pointer"
                    }}
                    onClick={() => setActiveLightbox({ src: story.imageLarge, title: story.title, story })}
                  >
                    <img
                      src={story.imageLarge}
                      alt={story.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "contrast(1.05) brightness(0.92)",
                        transition: "transform 0.6s ease"
                      }}
                    />

                    {/* Expand Icon */}
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(8, 8, 10, 0.75)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        display: "grid",
                        placeItems: "center",
                        color: "#F5F4F0"
                      }}
                    >
                      <Maximize2 size={14} />
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: "0.85rem",
                        left: "1rem",
                        display: "flex",
                        gap: "0.4rem"
                      }}
                    >
                      <span className="editorial-badge">{story.tag}</span>
                    </div>
                  </div>

                  {/* Overlapping Secondary Portrait Visual */}
                  <div
                    className="editorial-secondary-photo"
                    style={{
                      position: "absolute",
                      bottom: "-2rem",
                      right: isReversed ? "auto" : "-1.2rem",
                      left: isReversed ? "-1.2rem" : "auto",
                      width: "clamp(150px, 30%, 220px)",
                      aspectRatio: "3 / 4",
                      overflow: "hidden",
                      border: "1px solid rgba(245, 244, 240, 0.3)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                      cursor: "pointer",
                      zIndex: 5
                    }}
                    onClick={() => setActiveLightbox({ src: story.imageSide, title: `${story.title} // DETAIL`, story })}
                  >
                    <img
                      src={story.imageSide}
                      alt="Detail shot"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div
                className="responsive-stack-967 col-span-12 lg:col-span-5"
                style={{
                  gridColumn: "span 12",
                  order: isReversed ? 1 : 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  width: "100%"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-burgundy-light)", letterSpacing: "0.14em" }}>
                    {story.number}
                  </span>
                  <span style={{ width: "20px", height: "1px", background: "rgba(245,244,240,0.2)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "uppercase" }}>
                    {story.location}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.8rem, 3.8vw, 3.8rem)",
                    fontWeight: 600,
                    lineHeight: 0.95,
                    letterSpacing: "-0.01em"
                  }}
                >
                  {story.title}
                </h3>

                <blockquote
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                    color: "var(--accent-silver)",
                    borderLeft: "2px solid var(--accent-burgundy)",
                    paddingLeft: "1rem",
                    margin: "0.35rem 0"
                  }}
                >
                  “{story.quote}”
                </blockquote>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.65
                  }}
                >
                  {story.caption}
                </p>

                {/* Photographer Credit Block */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(245, 244, 240, 0.1)",
                    paddingTop: "1rem",
                    marginTop: "0.25rem",
                    flexWrap: "wrap",
                    gap: "0.85rem"
                  }}
                >
                  <div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-dim)", display: "block" }}>
                      DIRECTED BY
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 600 }}>
                      {story.photographer}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenAtelier(story.title)}
                    className="btn-outline"
                    style={{ minHeight: "36px", padding: "0 1.15rem", fontSize: "0.7rem" }}
                  >
                    View Press Dossier <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {activeLightbox && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            backgroundColor: "rgba(8, 8, 10, 0.95)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(1rem, 3vw, 2rem)"
          }}
          onClick={() => setActiveLightbox(null)}
        >
          {/* Lightbox Topbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span className="editorial-badge accent">{activeLightbox.story.number}</span>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", marginTop: "0.3rem" }}>
                {activeLightbox.title}
              </h4>
            </div>

            <button
              onClick={() => setActiveLightbox(null)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                cursor: "pointer"
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Lightbox Image Stage */}
          <div
            style={{
              maxHeight: "72vh",
              display: "grid",
              placeItems: "center",
              margin: "auto 0"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightbox.src}
              alt={activeLightbox.title}
              style={{
                maxWidth: "92vw",
                maxHeight: "68vh",
                objectFit: "contain",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 30px 90px rgba(0, 0, 0, 0.9)"
              }}
            />
          </div>

          {/* Lightbox Footer Info */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "0.85rem", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
              LOCATION: {activeLightbox.story.location}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
              PHOTOGRAPHY: {activeLightbox.story.photographer}
            </span>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 968px) {
          .lg\\:col-span-7 {
            grid-column: span 7 / span 7 !important;
          }
          .lg\\:col-span-5 {
            grid-column: span 5 / span 5 !important;
          }
        }
      `}</style>
    </section>
  );
}
