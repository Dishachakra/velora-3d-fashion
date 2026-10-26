import React, { useState } from "react";
import { ArrowUp, ArrowRight, Mail, Globe, Check } from "lucide-react";

export default function ContactFooter({ onOpenAtelier }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const letters = ["V", "E", "L", "O", "R", "A"];

  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        paddingTop: "clamp(5rem, 10vh, 8rem)",
        borderTop: "1px solid rgba(245, 244, 240, 0.12)",
        overflow: "hidden",
        width: "100%"
      }}
    >
      {/* Background Burgundy Aura */}
      <div
        className="atmospheric-aura"
        style={{
          width: "clamp(350px, 60vw, 900px)",
          height: "clamp(350px, 60vw, 900px)",
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(99, 29, 49, 0.4) 0%, rgba(15, 14, 20, 0.8) 60%, transparent 100%)",
          opacity: 0.35
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 clamp(1rem, 3.5vw, 3.5rem)",
          width: "100%"
        }}
      >
        {/* Top Grid: Newsletter, Inquiries, Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "clamp(2rem, 4vw, 3rem)",
            paddingBottom: "clamp(3rem, 6vw, 5rem)",
            borderBottom: "1px solid rgba(245, 244, 240, 0.1)",
            width: "100%"
          }}
        >
          {/* Col 1: Tagline & Mission */}
          <div>
            <span className="editorial-badge accent" style={{ marginBottom: "0.85rem" }}>
              MAISON DE COUTURE
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontStyle: "italic",
                fontWeight: 300,
                marginTop: "0.4rem",
                lineHeight: 1.15
              }}
            >
              Wear the Unordinary.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                marginTop: "0.85rem",
                maxWidth: "34ch"
              }}
            >
              Architectural luxury tailoring, specular titanium armor, and bespoke digital couture crafted in our private salons.
            </p>
          </div>

          {/* Col 2: Salons & Directory */}
          <div className="footer-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                SALONS
              </span>
              <ul style={{ listStyle: "none", marginTop: "0.85rem", display: "grid", gap: "0.55rem", fontSize: "0.85rem" }}>
                <li style={{ color: "var(--text-primary)" }}>PARIS // CAMBON</li>
                <li style={{ color: "var(--text-muted)" }}>MILAN // MONTE</li>
                <li style={{ color: "var(--text-muted)" }}>TOKYO // AOYAMA</li>
                <li style={{ color: "var(--text-muted)" }}>REYKJAVIK // VAULT</li>
              </ul>
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                PORTFOLIO
              </span>
              <ul style={{ listStyle: "none", marginTop: "0.85rem", display: "grid", gap: "0.55rem", fontSize: "0.85rem" }}>
                <li><a href="#collections" className="editorial-link">Collections</a></li>
                <li><a href="#interactive-3d" className="editorial-link">3D Atelier</a></li>
                <li><a href="#editorial" className="editorial-link">Editorial Archive</a></li>
                <li>
                  <button
                    onClick={() => onOpenAtelier("NOIR")}
                    style={{ background: "none", border: "none", padding: 0, color: "var(--text-primary)", cursor: "pointer", fontFamily: "inherit" }}
                    className="editorial-link"
                  >
                    Private Lookbook
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: VIP Newsletter & Contact */}
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              VIP ATELIER DISPATCH
            </span>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem", marginBottom: "1rem", lineHeight: 1.5 }}>
              Receive invitations to private runway previews, salon fittings, and limited hardware drops.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.4rem", width: "100%" }}>
                <input
                  type="email"
                  required
                  placeholder="vip@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "0.7rem 0.85rem",
                    background: "rgba(245, 244, 240, 0.04)",
                    border: "1px solid rgba(245, 244, 240, 0.15)",
                    color: "#F5F4F0",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    outline: "none"
                  }}
                />
                <button
                  type="submit"
                  className="btn-luxury"
                  style={{ minHeight: "42px", padding: "0 1.1rem" }}
                  title="Subscribe"
                >
                  <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#00E5FF", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                <Check size={15} />
                <span>CONFIRMED // DISPATCH ACCREDITED</span>
              </div>
            )}

            {/* Social Links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.2rem" }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem", textDecoration: "none", fontSize: "0.8rem" }}
                className="hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> Instagram
              </a>
              <a
                href="#editorial"
                style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem", textDecoration: "none", fontSize: "0.8rem" }}
                className="hover:text-white"
              >
                <Globe size={14} /> Editorial
              </a>
              <button
                onClick={() => onOpenAtelier("NOIR")}
                style={{ background: "none", border: "none", padding: 0, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer", fontSize: "0.8rem" }}
                className="hover:text-white"
              >
                <Mail size={14} /> Concierge
              </button>
            </div>
          </div>
        </div>

        {/* Middle Dramatic Typography: Giant VELORA Wordmark & Echo */}
        <div
          style={{
            padding: "clamp(2.5rem, 5vw, 4.5rem) 0 1.5rem",
            textAlign: "center",
            position: "relative",
            width: "100%",
            overflow: "hidden"
          }}
        >
          <div className="velora-giant-word" aria-label="VELORA">
            {letters.map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </div>

          {/* Reverse Echo Wordmark */}
          <div className="velora-echo-word" aria-hidden="true">
            {letters.map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </div>
        </div>

        {/* Bottom Utility Bar & Back-to-Top */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.5rem 0 2.5rem",
            borderTop: "1px solid rgba(245, 244, 240, 0.08)",
            gap: "1.2rem"
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-dim)" }}>
            <span>© 2027 VELORA HAUTE COUTURE</span>
            <span>ALL RIGHTS RESERVED</span>
            <span className="hide-on-767">PARIS // MILANO // TOKYO</span>
          </div>

          {/* Back to top interaction */}
          <button
            onClick={scrollToTop}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(245, 244, 240, 0.04)",
              border: "1px solid rgba(245, 244, 240, 0.15)",
              color: "#F5F4F0",
              padding: "0.5rem 1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00E5FF";
              e.currentTarget.style.color = "#00E5FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(245, 244, 240, 0.15)";
              e.currentTarget.style.color = "#F5F4F0";
            }}
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
