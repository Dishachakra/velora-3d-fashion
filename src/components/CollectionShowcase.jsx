import React, { useState } from "react";
import { ArrowUpRight, Layers, Sliders, ChevronRight } from "lucide-react";
import { COLLECTIONS } from "../data/fashionData";

export default function CollectionShowcase({ onOpenAtelier }) {
  const [activeTab, setActiveTab] = useState("noir");
  const [selectedLook, setSelectedLook] = useState(null);

  const activeCollection = COLLECTIONS.find((c) => c.id === activeTab) || COLLECTIONS[0];

  return (
    <section
      id="collections"
      style={{
        position: "relative",
        backgroundColor: "var(--bg-secondary)",
        padding: "clamp(4rem, 8vh, 7rem) clamp(1rem, 3.5vw, 3.5rem)",
        borderTop: "1px solid rgba(245, 244, 240, 0.08)",
        overflow: "hidden",
        width: "100%"
      }}
    >
      {/* Background Ambient Glow */}
      <div
        className="atmospheric-aura"
        style={{
          width: "clamp(300px, 45vw, 600px)",
          height: "clamp(300px, 45vw, 600px)",
          top: "10%",
          right: "-5%",
          background: activeCollection.colorAccent,
          opacity: 0.18
        }}
      />

      {/* Section Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
          alignItems: "end",
          marginBottom: "clamp(2.5rem, 5vw, 4.5rem)"
        }}
      >
        <div>
          <div className="editorial-badge accent" style={{ marginBottom: "0.85rem" }}>
            <Layers size={13} />
            <span>TRIFECTA COUTURE CONCEPTS</span>
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
            The Collection
          </h2>
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.88rem, 1.2vw, 1.05rem)",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            maxWidth: "46ch"
          }}
        >
          Three distinct avant-garde philosophies. From monolithic midnight architectures to liquid silk cascades and speculative titanium armor.
        </p>
      </div>

      {/* Interactive Collection Selector Tabs - Horizontal Scroll on small screens */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          borderBottom: "1px solid rgba(245, 244, 240, 0.12)",
          paddingBottom: "1.2rem",
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none"
        }}
      >
        {COLLECTIONS.map((col, idx) => {
          const isActive = col.id === activeTab;
          return (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.75rem clamp(1rem, 2vw, 1.5rem)",
                background: isActive ? "rgba(245, 244, 240, 0.08)" : "transparent",
                border: isActive ? `1px solid ${col.colorAccent}` : "1px solid transparent",
                color: isActive ? "#F5F4F0" : "var(--text-muted)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease"
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: isActive ? col.colorAccent : "var(--text-dim)"
                }}
              >
                0{idx + 1}
              </span>
              <span>{col.title}</span>
              {isActive && (
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: col.colorAccent,
                    boxShadow: `0 0 10px ${col.colorAccent}`
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Active Collection Presentation */}
      <div
        className="grid-12-col"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "2.5rem clamp(1.2rem, 2.5vw, 3rem)",
          alignItems: "start",
          width: "100%"
        }}
      >
        {/* Left Column: Editorial Visual Showcase */}
        <div
          className="responsive-stack-967 col-span-12 lg:col-span-7"
          style={{
            gridColumn: "span 12",
            position: "relative",
            width: "100%"
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 10",
              minHeight: "260px",
              overflow: "hidden",
              border: "1px solid rgba(245, 244, 240, 0.15)",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.7)"
            }}
          >
            <img
              src={activeCollection.heroImage}
              alt={activeCollection.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "contrast(1.08) brightness(0.95)",
                transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            />

            {/* Floating Editorial Badge on Image */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem"
              }}
            >
              <span className="editorial-badge accent">SERIES // {activeCollection.title}</span>
              <span className="editorial-badge hide-on-767">{activeCollection.year}</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "clamp(1rem, 3vw, 2rem) clamp(1rem, 2vw, 1.75rem)",
                background: "linear-gradient(to top, rgba(8, 8, 10, 0.95) 0%, transparent 100%)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "0.85rem"
              }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: activeCollection.colorAccent, letterSpacing: "0.1em" }}>
                  EDITORIAL CAMPAIGN
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 700, marginTop: "0.2rem" }}>
                  {activeCollection.subtitle}
                </h3>
              </div>
              <button
                onClick={() => onOpenAtelier(activeCollection.title)}
                className="btn-luxury"
                style={{ minHeight: "36px", padding: "0 1.1rem", fontSize: "0.7rem" }}
              >
                Inquire <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* Secondary Layered Images */}
          <div
            className="editorial-secondary-photo"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.2rem",
              marginTop: "1.2rem"
            }}
          >
            <div style={{ height: "clamp(180px, 22vw, 240px)", overflow: "hidden", border: "1px solid rgba(245,244,240,0.1)" }}>
              <img
                src={activeCollection.lookImage}
                alt="Silhouette detail"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ height: "clamp(180px, 22vw, 240px)", overflow: "hidden", border: "1px solid rgba(245,244,240,0.1)" }}>
              <img
                src={activeCollection.detailImage}
                alt="Texture detail"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Collection Manifesto & Specs */}
        <div
          className="responsive-stack-967 col-span-12 lg:col-span-5"
          style={{
            gridColumn: "span 12",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            width: "100%"
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: activeCollection.colorAccent,
                letterSpacing: "0.12em",
                textTransform: "uppercase"
              }}
            >
              CONCEPTION & PHILOSOPHY
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1,
                marginTop: "0.4rem",
                letterSpacing: "-0.01em"
              }}
            >
              {activeCollection.title}
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
                lineHeight: 1.7,
                marginTop: "0.85rem"
              }}
            >
              {activeCollection.description}
            </p>
          </div>

          {/* Technical Specs Dossier */}
          <div
            style={{
              background: "rgba(245, 244, 240, 0.02)",
              border: "1px solid rgba(245, 244, 240, 0.1)",
              padding: "clamp(1rem, 2vw, 1.5rem)",
              width: "100%"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem", color: "var(--text-primary)" }}>
              <Sliders size={13} color={activeCollection.colorAccent} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
                HAUTE ATELIER SPECIFICATIONS
              </span>
            </div>

            <div style={{ display: "grid", gap: "0.75rem" }}>
              {activeCollection.specs.map((spec, i) => (
                <div
                  key={i}
                  className="specs-grid-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 1fr",
                    gap: "0.75rem",
                    borderBottom: i < activeCollection.specs.length - 1 ? "1px solid rgba(245, 244, 240, 0.06)" : "none",
                    paddingBottom: "0.55rem"
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "uppercase" }}>
                    {spec.label}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 500 }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Looks List */}
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              CURATED ENSEMBLES ({activeCollection.looks.length})
            </span>

            <div style={{ display: "grid", gap: "0.75rem", marginTop: "0.85rem" }}>
              {activeCollection.looks.map((look) => (
                <div
                  key={look.code}
                  className="look-card-inner"
                  onClick={() => setSelectedLook(look)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    background: "rgba(245, 244, 240, 0.02)",
                    border: "1px solid rgba(245, 244, 240, 0.08)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    gap: "0.75rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = activeCollection.colorAccent;
                    e.currentTarget.style.background = "rgba(245, 244, 240, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245, 244, 240, 0.08)";
                    e.currentTarget.style.background = "rgba(245, 244, 240, 0.02)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: 0 }}>
                    <div style={{ width: "38px", height: "38px", flexShrink: 0, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <img src={look.img} alt={look.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: activeCollection.colorAccent }}>
                          {look.code}
                        </span>
                        <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {look.name}
                        </h4>
                      </div>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {look.material}
                      </p>
                    </div>
                  </div>

                  <div className="look-price-tag" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", fontWeight: 600 }}>
                      {look.price}
                    </span>
                    <ChevronRight size={15} color="var(--text-dim)" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lookbook Quick Modal */}
      {selectedLook && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(8, 8, 10, 0.88)",
            backdropFilter: "blur(14px)",
            display: "grid",
            placeItems: "center",
            padding: "1rem"
          }}
          onClick={() => setSelectedLook(null)}
        >
          <div
            style={{
              background: "#111018",
              border: "1px solid rgba(245, 244, 240, 0.2)",
              maxWidth: "540px",
              width: "100%",
              padding: "clamp(1.2rem, 3vw, 2rem)",
              display: "grid",
              gap: "1.2rem",
              boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span className="editorial-badge accent">{selectedLook.code} // {selectedLook.category}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", marginTop: "0.4rem" }}>
                  {selectedLook.name}
                </h3>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 700 }}>
                {selectedLook.price}
              </span>
            </div>

            <div style={{ height: "clamp(220px, 35vh, 320px)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
              <img src={selectedLook.img} alt={selectedLook.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                MATERIAL: {selectedLook.material}
              </span>
              <button
                onClick={() => {
                  setSelectedLook(null);
                  onOpenAtelier(selectedLook.name);
                }}
                className="btn-luxury"
              >
                Inquire Bespoke Look <ArrowUpRight size={13} />
              </button>
            </div>
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
