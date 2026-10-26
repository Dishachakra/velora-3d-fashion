import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import AudioAmbiance from "./AudioAmbiance";

export default function Navbar({ onOpenAtelier }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Collections", href: "#collections" },
    { label: "3D Couture", href: "#interactive-3d" },
    { label: "Editorial", href: "#editorial" },
    { label: "The Vision", href: "#vision" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header
        className="nav-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1rem, 3.5vw, 3.5rem)",
          height: scrolled ? "64px" : "80px",
          backgroundColor: scrolled ? "rgba(8, 8, 10, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245, 244, 240, 0.08)" : "1px solid transparent",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Brand Left */}
        <a
          href="#hero"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.6rem",
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <span
            className="brand-logo-text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            VELORA
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
              textTransform: "uppercase"
            }}
            className="hidden sm:inline-block hide-on-967"
          >
            COUTURE // 2027
          </span>
        </a>

        {/* Center Desktop Links - Shown on screens >= 968px (1366, 1240, 1190) */}
        <nav
          style={{
            display: "none",
            gap: "clamp(1.2rem, 2.2vw, 2.2rem)",
            alignItems: "center"
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="editorial-link"
              style={{
                fontSize: "clamp(0.75rem, 0.9vw, 0.82rem)",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.12em",
                textTransform: "uppercase"
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.4rem, 1.5vw, 1rem)" }}>
          {/* Sound Ambience */}
          <AudioAmbiance />

          {/* Atelier CTA: Desktop & Tablet */}
          <button
            onClick={() => onOpenAtelier("NOIR")}
            className="btn-luxury hide-on-767"
            style={{ minHeight: "38px", padding: "0 1.15rem", fontSize: "0.72rem" }}
          >
            Atelier RSVP <ArrowUpRight size={13} />
          </button>

          {/* Mobile Menu Button: Shown on screens <= 967px (967, 768, 767, 575, 475, 390) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-burger-btn"
            style={{
              background: "transparent",
              border: "1px solid rgba(245, 244, 240, 0.2)",
              color: "#F5F4F0",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              display: "none",
              placeItems: "center",
              cursor: "pointer",
              transition: "border-color 0.2s"
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 850,
            backgroundColor: "#08080A",
            padding: "5rem clamp(1.25rem, 5vw, 3.5rem) 2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto"
          }}
        >
          <div>
            <span className="editorial-badge accent" style={{ marginBottom: "1.5rem" }}>
              NAVIGATION DIRECTORY
            </span>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.85rem", marginTop: "1rem" }}>
              {navLinks.map((link, idx) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 7vw, 3.5rem)",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "-0.02em",
                      textDecoration: "none",
                      color: "#F5F4F0",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.85rem",
                      transition: "color 0.3s"
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-burgundy-light)" }}>
                      0{idx + 1}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ borderTop: "1px solid rgba(245, 244, 240, 0.1)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
              PARIS // MILAN // TOKYO // REYKJAVIK
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAtelier("NOIR");
              }}
              className="btn-luxury"
              style={{ minHeight: "42px", padding: "0 1.25rem", fontSize: "0.75rem" }}
            >
              Atelier Access <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 968px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-burger-btn {
            display: none !important;
          }
        }
        @media (max-width: 967px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-burger-btn {
            display: grid !important;
          }
        }
      `}</style>
    </>
  );
}
