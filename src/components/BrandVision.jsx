import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Sparkles } from "lucide-react";
import { ATELIER_METRICS } from "../data/fashionData";

export default function BrandVision() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.08);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, -2, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Flowing Undulating Silk Cloth Mesh
    const planeGeo = new THREE.PlaneGeometry(14, 10, 48, 36);
    const originalPositions = planeGeo.attributes.position.clone();

    const planeMat = new THREE.MeshPhysicalMaterial({
      color: 0x2c0c17,
      emissive: 0x110207,
      roughness: 0.35,
      metalness: 0.8,
      clearcoat: 0.9,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    // Delicate wireframe grid accent
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const wireMesh = new THREE.Mesh(planeGeo, wireMat);
    wireMesh.rotation.x = -Math.PI / 3;
    wireMesh.position.z = 0.02;
    scene.add(wireMesh);

    // Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0x0e0b16, 2.5);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x9b2c4b, 4.5, 20);
    light1.position.set(-4, 3, 4);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00e5ff, 3.0, 20);
    light2.position.set(4, -3, 3);
    scene.add(light2);

    // Mouse Interaction
    let mouseX = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Undulate vertices with silky fluid dynamics
      const pos = planeGeo.attributes.position;
      const orig = originalPositions;
      const count = pos.count;

      for (let i = 0; i < count; i++) {
        const x = orig.getX(i);
        const y = orig.getY(i);
        const wave =
          Math.sin(elapsed * 1.6 + x * 0.7 + y * 0.9) * 0.45 +
          Math.cos(elapsed * 1.2 + x * 1.1) * 0.25;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;

      mesh.rotation.z = Math.sin(elapsed * 0.3) * 0.08 + mouseX * 0.1;
      wireMesh.rotation.z = mesh.rotation.z;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <section
      id="vision"
      style={{
        position: "relative",
        backgroundColor: "var(--bg-primary)",
        padding: "clamp(5rem, 10vh, 9rem) clamp(1rem, 3.5vw, 3.5rem)",
        borderTop: "1px solid rgba(245, 244, 240, 0.08)",
        overflow: "hidden",
        width: "100%"
      }}
    >
      {/* 3D Animated Silk Cloth Background */}
      <div
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.55,
          pointerEvents: "none"
        }}
      />

      {/* Foreground Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4.5rem)" }}>
          <div className="editorial-badge accent" style={{ margin: "0 auto 1.2rem" }}>
            <Sparkles size={12} color="#00E5FF" />
            <span>MANIFESTO DE LA MAISON</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.65rem, 4.2vw, 4.6rem)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              maxWidth: "24ch",
              margin: "0 auto",
              color: "#F5F4F0"
            }}
          >
            “Fashion is not just what you wear. It is the <span style={{ color: "#00E5FF", fontStyle: "normal", fontWeight: 500 }}>space you occupy</span>, the <span style={{ color: "var(--accent-burgundy-light)", fontStyle: "normal", fontWeight: 500 }}>movement you create</span>, and the <span style={{ textDecoration: "underline", textUnderlineOffset: "8px", fontStyle: "normal" }}>future you imagine</span>.”
          </h2>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.72rem, 1vw, 0.85rem)",
              letterSpacing: "0.14em",
              color: "var(--text-muted)",
              marginTop: "clamp(1.5rem, 3vh, 2.5rem)",
              textTransform: "uppercase"
            }}
          >
            — ATELIER VELORA // CODEX PHILOSOPHICUM
          </p>
        </div>

        {/* Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: "1.2rem",
            marginTop: "clamp(2.5rem, 5vw, 4.5rem)",
            borderTop: "1px solid rgba(245, 244, 240, 0.12)",
            paddingTop: "2.5rem",
            width: "100%"
          }}
        >
          {ATELIER_METRICS.map((metric, i) => (
            <div
              key={i}
              style={{
                background: "rgba(15, 14, 20, 0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(245, 244, 240, 0.08)",
                padding: "clamp(1.2rem, 2.5vw, 1.8rem) clamp(1rem, 2vw, 1.5rem)",
                display: "grid",
                gap: "0.5rem"
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: i % 2 === 0 ? "#F5F4F0" : "#00E5FF"
                }}
              >
                {metric.value}
              </span>
              <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600 }}>
                {metric.label}
              </h4>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
