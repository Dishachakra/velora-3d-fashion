import React, { useState } from "react";
import { X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export default function AtelierDrawer({ isOpen, onClose, initialCollection = "NOIR" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "PARIS",
    collection: initialCollection,
    requestType: "Private Fitting"
  });
  const [submitted, setSubmitted] = useState(false);
  const [passNumber, setPassNumber] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D4D7DE", "#631D31", "#F5F4F0", "#00E5FF"]
      });
    } catch (_) {}

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setPassNumber(`VL-${formData.city.substring(0, 3)}-${randomNum}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "rgba(8, 8, 10, 0.78)",
        backdropFilter: "blur(12px)",
        transition: "opacity 0.4s ease"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "min(100vw, 500px)",
          height: "100%",
          backgroundColor: "#0E0D13",
          borderLeft: "1px solid rgba(245, 244, 240, 0.12)",
          padding: "clamp(1.2rem, 3.5vw, 2.5rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowY: "auto",
          position: "relative",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.8)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <span className="editorial-badge accent">CONFIDENTIAL ATELIER</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)", fontWeight: 700, marginTop: "0.35rem", letterSpacing: "-0.02em" }}>
                PRIVATE ACCESS
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "1px solid rgba(245, 244, 240, 0.2)",
                color: "#F5F4F0",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              <X size={17} />
            </button>
          </div>

          {!submitted ? (
            <>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                VELORA operates on a strictly bespoke model. Request an invitation to our private salons in Paris, Milan, Tokyo, or Reykjavik, or receive the 3D archival dossier.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adrienne Laurent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.9rem",
                      background: "rgba(245, 244, 240, 0.03)",
                      border: "1px solid rgba(245, 244, 240, 0.15)",
                      color: "#F5F4F0",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
                    Private Contact / Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.9rem",
                      background: "rgba(245, 244, 240, 0.03)",
                      border: "1px solid rgba(245, 244, 240, 0.15)",
                      color: "#F5F4F0",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.85rem" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
                      Salon
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.9rem",
                        background: "#14131B",
                        border: "1px solid rgba(245, 244, 240, 0.15)",
                        color: "#F5F4F0",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        outline: "none"
                      }}
                    >
                      <option value="PARIS">Paris (Cambon)</option>
                      <option value="MILAN">Milan (Monte)</option>
                      <option value="TOKYO">Tokyo (Aoyama)</option>
                      <option value="REYKJAVIK">Reykjavik (Vault)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
                      Collection
                    </label>
                    <select
                      value={formData.collection}
                      onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.9rem",
                        background: "#14131B",
                        border: "1px solid rgba(245, 244, 240, 0.15)",
                        color: "#F5F4F0",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        outline: "none"
                      }}
                    >
                      <option value="NOIR">NOIR (Architectural)</option>
                      <option value="FLUX">FLUX (Silk Organza)</option>
                      <option value="CHROME">CHROME (Titanium Armor)</option>
                      <option value="ALL">Complete Archival Series</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: "0.85rem" }}>
                  <button type="submit" className="btn-luxury" style={{ width: "100%" }}>
                    Request Dossier & Appointment <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1.5rem 0.5rem" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  margin: "0 auto 1.2rem",
                  borderRadius: "50%",
                  background: "rgba(99, 29, 49, 0.3)",
                  border: "1px solid #631D31",
                  display: "grid",
                  placeItems: "center",
                  color: "#00E5FF"
                }}
              >
                <Sparkles size={24} />
              </div>

              <span className="editorial-badge accent" style={{ marginBottom: "0.85rem" }}>INVITATION GRANTED</span>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "0.6rem" }}>
                BIENVENUE, {formData.name.toUpperCase()}
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Your private dossier has been logged. An atelier liaison from our {formData.city} salon will contact you shortly.
              </p>

              {/* Digital Pass Card */}
              <div
                style={{
                  background: "linear-gradient(135deg, #1A1824 0%, #0F0E14 100%)",
                  border: "1px solid rgba(245, 244, 240, 0.2)",
                  padding: "1.2rem",
                  borderRadius: "4px",
                  textAlign: "left",
                  marginBottom: "1.5rem",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.6rem", marginBottom: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em" }}>VELORA ATELIER</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#00E5FF" }}>{passNumber}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  <div>SALON: {formData.city}</div>
                  <div>SERIES: {formData.collection}</div>
                  <div>STATUS: CONFIRMED</div>
                  <div>SECURITY: LEVEL 1</div>
                </div>
              </div>

              <button onClick={handleReset} className="btn-outline" style={{ width: "100%" }}>
                Return to Digital Exhibition
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div style={{ borderTop: "1px solid rgba(245, 244, 240, 0.08)", paddingTop: "1.2rem", marginTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-dim)", fontSize: "0.7rem", fontFamily: "var(--font-mono)" }}>
            <ShieldCheck size={13} />
            <span>ENCRYPTED ATELIER CONCIERGE // ZERO SPAM ASSURANCE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
