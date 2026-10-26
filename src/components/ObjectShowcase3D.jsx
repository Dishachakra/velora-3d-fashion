import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Eye, Sparkles, Sun, Shield, Check, RefreshCw } from "lucide-react";
import { THREE_HOTSPOTS } from "../data/fashionData";

export default function ObjectShowcase3D({ onOpenAtelier }) {
  const mountRef = useRef(null);
  const [activeMaterial, setActiveMaterial] = useState("chrome");
  const [isWireframe, setIsWireframe] = useState(false);
  const [activeLighting, setActiveLighting] = useState("studio");
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [screenHotspots, setScreenHotspots] = useState([]);

  // Three.js refs for live updates
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const lightsRef = useRef({});
  const controlsStateRef = useRef({
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    rotX: 0.1,
    rotY: 0,
    targetRotX: 0.1,
    targetRotY: 0,
    zoom: 7.2
  });

  const materialsConfig = {
    chrome: {
      name: "Liquid Titanium Chrome",
      color: 0xefede8,
      roughness: 0.1,
      metalness: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: 0x050508
    },
    obsidian: {
      name: "Obsidian Noir Carbon",
      color: 0x111015,
      roughness: 0.55,
      metalness: 0.25,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
      emissive: 0x220510
    },
    burgundy: {
      name: "Grand Cru Velvet",
      color: 0x631d31,
      roughness: 0.28,
      metalness: 0.65,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      emissive: 0x1a030b
    },
    iridescent: {
      name: "Cyber Holographic",
      color: 0x10d5e6,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: 0x3d0066
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, controlsStateRef.current.zoom);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Main Fashion Sculpture Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    meshRef.current = mainGroup;

    // 1. Avant-Garde Corset Carapace
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.6, 0.45, 200, 36, 3, 4);
    const initialMat = new THREE.MeshPhysicalMaterial(materialsConfig[activeMaterial]);
    const carapaceMesh = new THREE.Mesh(torusKnotGeo, initialMat);
    mainGroup.add(carapaceMesh);

    // 2. Sculptural Exoskeleton Ribs
    const ribGroup = new THREE.Group();
    const ribCount = 8;
    for (let i = 0; i < ribCount; i++) {
      const angle = (i / ribCount) * Math.PI * 2;
      const ribGeo = new THREE.TorusGeometry(2.3 + Math.sin(i * 1.5) * 0.4, 0.015, 12, 64, Math.PI * 0.9);
      const ribMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        metalness: 0.9,
        roughness: 0.2
      });
      const ribMesh = new THREE.Mesh(ribGeo, ribMat);
      ribMesh.rotation.z = angle;
      ribMesh.rotation.x = Math.PI / 4;
      ribGroup.add(ribMesh);
    }
    mainGroup.add(ribGroup);

    // 3. Floating Hotspot Anchors in 3D
    const hotspotAnchors = THREE_HOTSPOTS.map((spot) => {
      const dotGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.set(spot.position[0], spot.position[1], spot.position[2]);
      mainGroup.add(dotMesh);
      return { id: spot.id, mesh: dotMesh, spot };
    });

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x181522, 2.0);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffffff, 4.5);
    keySpot.position.set(6, 8, 7);
    keySpot.angle = Math.PI / 4;
    keySpot.penumbra = 0.5;
    scene.add(keySpot);

    const burgundyFill = new THREE.PointLight(0x7e223d, 4.0, 20);
    burgundyFill.position.set(-6, -3, 5);
    scene.add(burgundyFill);

    const cyanRim = new THREE.PointLight(0x00e5ff, 3.5, 20);
    cyanRim.position.set(4, -5, -6);
    scene.add(cyanRim);

    lightsRef.current = { ambientLight, keySpot, burgundyFill, cyanRim };

    // Mouse Drag Handling
    const handleMouseDown = (e) => {
      controlsStateRef.current.isDragging = true;
      controlsStateRef.current.prevMouseX = e.clientX;
      controlsStateRef.current.prevMouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!controlsStateRef.current.isDragging) return;
      const deltaX = e.clientX - controlsStateRef.current.prevMouseX;
      const deltaY = e.clientY - controlsStateRef.current.prevMouseY;

      controlsStateRef.current.targetRotY += deltaX * 0.007;
      controlsStateRef.current.targetRotX += deltaY * 0.007;

      controlsStateRef.current.prevMouseX = e.clientX;
      controlsStateRef.current.prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      controlsStateRef.current.isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.003;
      controlsStateRef.current.zoom = Math.min(Math.max(controlsStateRef.current.zoom + zoomDelta, 4.5), 11);
      camera.position.z = controlsStateRef.current.zoom;
    };

    const dom = renderer.domElement;
    dom.style.touchAction = "none";
    dom.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    dom.addEventListener("wheel", handleWheel, { passive: false });

    // Touch support for mobile devices (390px, 475px, 575px, 768px)
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        controlsStateRef.current.targetRotY += dx * 0.008;
        controlsStateRef.current.targetRotX += dy * 0.008;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    dom.addEventListener("touchstart", handleTouchStart, { passive: true });
    dom.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Render Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth inertia rotation lerp
      controlsStateRef.current.rotX += (controlsStateRef.current.targetRotX - controlsStateRef.current.rotX) * 0.08;
      controlsStateRef.current.rotY += (controlsStateRef.current.targetRotY - controlsStateRef.current.rotY) * 0.08;

      if (autoRotate && !controlsStateRef.current.isDragging) {
        controlsStateRef.current.targetRotY += delta * 0.25;
      }

      mainGroup.rotation.x = controlsStateRef.current.rotX + Math.sin(elapsed * 0.8) * 0.05;
      mainGroup.rotation.y = controlsStateRef.current.rotY;
      mainGroup.position.y = Math.sin(elapsed * 1.2) * 0.12;

      ribGroup.rotation.z = elapsed * 0.1;

      // Project 3D Hotspot positions to screen coordinates
      const currentW = container.clientWidth;
      const currentH = container.clientHeight;

      const projected = hotspotAnchors.map((item) => {
        const worldPos = new THREE.Vector3();
        item.mesh.getWorldPosition(worldPos);
        worldPos.project(camera);

        const screenX = ((worldPos.x + 1) * currentW) / 2;
        const screenY = ((-worldPos.y + 1) * currentH) / 2;
        const isVisible = worldPos.z < 1;

        return {
          id: item.id,
          x: screenX,
          y: screenY,
          visible: isVisible,
          spot: item.spot
        };
      });

      setScreenHotspots(projected);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      dom.removeEventListener("wheel", handleWheel);
      dom.removeEventListener("touchstart", handleTouchStart);
      dom.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusKnotGeo.dispose();
      initialMat.dispose();
    };
  }, []);

  // Update Material dynamically
  useEffect(() => {
    if (!meshRef.current) return;
    const carapaceMesh = meshRef.current.children[0];
    if (carapaceMesh) {
      const cfg = materialsConfig[activeMaterial];
      carapaceMesh.material.color.setHex(cfg.color);
      carapaceMesh.material.roughness = cfg.roughness;
      carapaceMesh.material.metalness = cfg.metalness;
      carapaceMesh.material.clearcoat = cfg.clearcoat;
      carapaceMesh.material.clearcoatRoughness = cfg.clearcoatRoughness;
      carapaceMesh.material.emissive.setHex(cfg.emissive);
      carapaceMesh.material.wireframe = isWireframe;
      carapaceMesh.material.needsUpdate = true;
    }
  }, [activeMaterial, isWireframe]);

  // Update Lighting dynamically
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights.keySpot) return;

    if (activeLighting === "studio") {
      lights.keySpot.color.setHex(0xffffff);
      lights.keySpot.intensity = 4.5;
      lights.burgundyFill.color.setHex(0x7e223d);
      lights.burgundyFill.intensity = 4.0;
      lights.cyanRim.color.setHex(0x00e5ff);
      lights.cyanRim.intensity = 3.5;
    } else if (activeLighting === "midnight") {
      lights.keySpot.color.setHex(0x667799);
      lights.keySpot.intensity = 2.0;
      lights.burgundyFill.color.setHex(0x631d31);
      lights.burgundyFill.intensity = 6.0;
      lights.cyanRim.color.setHex(0x221144);
      lights.cyanRim.intensity = 2.0;
    } else if (activeLighting === "cyber") {
      lights.keySpot.color.setHex(0x00e5ff);
      lights.keySpot.intensity = 5.0;
      lights.burgundyFill.color.setHex(0xff0077);
      lights.burgundyFill.intensity = 5.0;
      lights.cyanRim.color.setHex(0xffffff);
      lights.cyanRim.intensity = 4.0;
    }
  }, [activeLighting]);

  const handleResetCamera = () => {
    controlsStateRef.current.targetRotX = 0.1;
    controlsStateRef.current.targetRotY = 0;
    controlsStateRef.current.zoom = 7.2;
    if (cameraRef.current) {
      cameraRef.current.position.z = 7.2;
    }
  };

  return (
    <section
      id="interactive-3d"
      style={{
        position: "relative",
        backgroundColor: "var(--bg-primary)",
        padding: "clamp(4rem, 8vh, 7rem) clamp(1rem, 3.5vw, 3.5rem)",
        borderTop: "1px solid rgba(245, 244, 240, 0.08)",
        overflow: "hidden",
        width: "100%"
      }}
    >
      {/* Background Aura */}
      <div
        className="atmospheric-aura"
        style={{
          width: "clamp(320px, 50vw, 700px)",
          height: "clamp(320px, 50vw, 700px)",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -20%)",
          background: "radial-gradient(circle, rgba(99, 29, 49, 0.3) 0%, rgba(0, 229, 255, 0.1) 50%, transparent 70%)",
          opacity: 0.3
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "1.5rem",
          marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          position: "relative",
          zIndex: 10
        }}
      >
        <div>
          <div className="editorial-badge accent" style={{ marginBottom: "0.85rem" }}>
            <Sparkles size={12} color="#00E5FF" />
            <span>INTERACTIVE ATELIER LAB // 3D DOSSIER</span>
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
            The Carapace
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: "0.6rem"
            }}
          >
            PARAMETRIC ANATOMICAL EXOSKELETON // MODEL VL-2027-C
          </p>
        </div>

        {/* Quick Interaction Guide */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <RotateCw size={13} className="animate-spin text-[#00E5FF]" />
            <span>DRAG TO ORBIT // SCROLL ZOOM</span>
          </div>
          <button
            onClick={handleResetCamera}
            title="Reset Perspective"
            className="btn-outline"
            style={{ minHeight: "34px", padding: "0 0.85rem", fontSize: "0.7rem" }}
          >
            <RefreshCw size={12} /> Reset View
          </button>
        </div>
      </div>

      {/* Main 3D Stage Container */}
      <div
        className="carapace-stage"
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(420px, 62vh, 720px)",
          background: "linear-gradient(180deg, rgba(15, 14, 20, 0.7) 0%, rgba(8, 8, 10, 0.95) 100%)",
          border: "1px solid rgba(245, 244, 240, 0.12)",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.8)",
          overflow: "hidden"
        }}
      >
        {/* Three.js Canvas Mount */}
        <div
          ref={mountRef}
          style={{
            width: "100%",
            height: "100%",
            cursor: "grab"
          }}
        />

        {/* 3D Hotspot Screen Anchors */}
        {screenHotspots.map(
          (spot) =>
            spot.visible && (
              <div
                key={spot.id}
                style={{
                  position: "absolute",
                  left: `${spot.x}px`,
                  top: `${spot.y}px`,
                  zIndex: 20
                }}
              >
                <div
                  className="hotspot-pin"
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  title={spot.spot.title}
                >
                  <div className="hotspot-pulse" />
                  <div className="hotspot-core" />
                </div>

                {/* Hotspot Popup Annotation Card */}
                {activeHotspot === spot.id && (
                  <div
                    className="glass-panel-elevated hotspot-annotation-card"
                    style={{
                      position: "absolute",
                      bottom: "35px",
                      left: "-110px",
                      width: "250px",
                      padding: "0.85rem 1rem",
                      zIndex: 30,
                      borderRadius: "2px"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.3rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#00E5FF", letterSpacing: "0.1em" }}>
                        SPEC // 0{THREE_HOTSPOTS.findIndex((s) => s.id === spot.id) + 1}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }}
                        style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.8rem" }}
                      >
                        ✕
                      </button>
                    </div>
                    <h5 style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                      {spot.spot.title}
                    </h5>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.74rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      {spot.spot.desc}
                    </p>
                  </div>
                )}
              </div>
            )
        )}

        {/* Top Floating Dossier Card (Hidden on screens <= 768px to keep canvas clear) */}
        <div
          className="glass-panel hide-on-767"
          style={{
            position: "absolute",
            top: "1.2rem",
            left: "1.2rem",
            padding: "0.85rem 1.15rem",
            zIndex: 15,
            maxWidth: "280px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
            <Shield size={12} color="#00E5FF" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
              ACTIVE MATERIAL FINISH
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700 }}>
            {materialsConfig[activeMaterial].name}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
            SPECULAR REFLECTIVITY: 94%
          </p>
        </div>

        {/* Bottom Floating Interactive Control Bar */}
        <div
          className="glass-panel-elevated carapace-controls"
          style={{
            position: "absolute",
            bottom: "clamp(0.85rem, 2vw, 1.25rem)",
            left: "clamp(0.85rem, 2vw, 1.25rem)",
            right: "clamp(0.85rem, 2vw, 1.25rem)",
            padding: "0.85rem clamp(0.75rem, 1.8vw, 1.5rem)",
            zIndex: 15,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.85rem"
          }}
        >
          {/* Material Finishes */}
          <div className="carapace-controls-row" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              FINISH:
            </span>
            {Object.keys(materialsConfig).map((key) => {
              const isActive = activeMaterial === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveMaterial(key)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.35rem clamp(0.45rem, 1vw, 0.75rem)",
                    background: isActive ? "rgba(245, 244, 240, 0.12)" : "rgba(245, 244, 240, 0.03)",
                    border: isActive ? "1px solid #00E5FF" : "1px solid rgba(245, 244, 240, 0.1)",
                    color: isActive ? "#F5F4F0" : "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.25s"
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: `#${materialsConfig[key].color.toString(16).padStart(6, "0")}`
                    }}
                  />
                  <span>{key}</span>
                  {isActive && <Check size={10} color="#00E5FF" />}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Wireframe, Lighting, Rotation, Reserve */}
          <div className="carapace-controls-row" style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
            {/* Wireframe toggle */}
            <button
              onClick={() => setIsWireframe(!isWireframe)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.35rem 0.65rem",
                background: isWireframe ? "rgba(0, 229, 255, 0.15)" : "transparent",
                border: isWireframe ? "1px solid #00E5FF" : "1px solid rgba(245, 244, 240, 0.1)",
                color: isWireframe ? "#00E5FF" : "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              <Eye size={12} />
              <span>{isWireframe ? "WIREFRAME" : "SOLID"}</span>
            </button>

            {/* Lighting Preset */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Sun size={12} color="var(--text-muted)" />
              <select
                value={activeLighting}
                onChange={(e) => setActiveLighting(e.target.value)}
                style={{
                  background: "#15141D",
                  border: "1px solid rgba(245, 244, 240, 0.15)",
                  color: "#F5F4F0",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  padding: "0.3rem 0.55rem",
                  outline: "none"
                }}
              >
                <option value="studio">STUDIO</option>
                <option value="midnight">MIDNIGHT</option>
                <option value="cyber">CYBER</option>
              </select>
            </div>

            {/* Auto-rotate */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.35rem 0.65rem",
                background: autoRotate ? "rgba(99, 29, 49, 0.25)" : "transparent",
                border: autoRotate ? "1px solid #631D31" : "1px solid rgba(245, 244, 240, 0.1)",
                color: autoRotate ? "#F5F4F0" : "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              <span>{autoRotate ? "ROTATING" : "PAUSED"}</span>
            </button>

            {/* Inquire Carapace */}
            <button
              onClick={() => onOpenAtelier("AURA CARAPACE")}
              className="btn-luxury"
              style={{ minHeight: "34px", padding: "0 1.1rem", fontSize: "0.7rem" }}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
