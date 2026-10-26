import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (_) {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.07);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Avant-Garde Couture Sculpture (Parametric Torus Knot with liquid chrome physics)
    const geometry = new THREE.TorusKnotGeometry(1.7, 0.36, 250, 42, 2, 3);
    const pos = geometry.attributes.position;
    const originalPositions = pos.clone();

    // Material with liquid chrome and subtle pearlescent clearcoat
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xefede8,
      emissive: 0x110710,
      roughness: 0.12,
      metalness: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0
    });

    const sculptureMesh = new THREE.Mesh(geometry, chromeMaterial);
    mainGroup.add(sculptureMesh);

    // 2. Concentric Orbital Rings (Fashion Exoskeleton Halos)
    const ringGeo1 = new THREE.TorusGeometry(3.0, 0.016, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x004555,
      emissiveIntensity: 0.4
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.012, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x9b2c4b,
      metalness: 0.85,
      roughness: 0.3,
      emissive: 0x3d0a1b,
      emissiveIntensity: 0.5
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    mainGroup.add(ring2);

    // 3. Floating Couture Dust Particles (Silk & Diamond micro-fibers)
    const particleCount = 420;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00e5ff); // Cyan
    const c2 = new THREE.Color(0xf5f4f0); // Ivory
    const c3 = new THREE.Color(0x9b2c4b); // Burgundy

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const colorPick = Math.random();
      const chosenColor = colorPick > 0.6 ? c1 : colorPick > 0.3 ? c3 : c2;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x15121e, 1.8);
    scene.add(ambientLight);

    // Main Studio Key Light
    const keyLight = new THREE.SpotLight(0xffffff, 4.2);
    keyLight.position.set(8, 10, 8);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.6;
    scene.add(keyLight);

    // Dramatic Burgundy Fill Light
    const fillLight = new THREE.PointLight(0x7e223d, 4.5, 20);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // Electric Cyan Rim Light
    const rimLight = new THREE.PointLight(0x00e5ff, 3.8, 20);
    rimLight.position.set(5, -6, -5);
    scene.add(rimLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.001;
      mouseY = (e.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 3.5;
      camera.position.y = -targetY * 3.5;
      camera.lookAt(scene.position);

      // Kinetic sculpture rotation
      sculptureMesh.rotation.y = elapsedTime * 0.28;
      sculptureMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.25;

      // Subtle organic breathing of vertices
      const posAttr = sculptureMesh.geometry.attributes.position;
      const orig = originalPositions;
      const count = posAttr.count;

      for (let i = 0; i < count; i += 4) {
        const u = orig.getX(i);
        const v = orig.getY(i);
        const w = orig.getZ(i);
        const wave = Math.sin(elapsedTime * 2.5 + u * 1.5 + v * 1.5) * 0.035;
        posAttr.setXYZ(i, u * (1 + wave), v * (1 + wave), w * (1 + wave));
      }
      posAttr.needsUpdate = true;

      // Outer rings orbit with counter-rotations
      ring1.rotation.z = elapsedTime * 0.15;
      ring1.rotation.y = elapsedTime * 0.18;
      ring2.rotation.z = -elapsedTime * 0.12;
      ring2.rotation.x = -elapsedTime * 0.14;

      // Particle subtle swirl
      particles.rotation.y = -elapsedTime * 0.06;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      chromeMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none"
      }}
    >
      {!hasWebGL && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "radial-gradient(circle at 50% 50%, rgba(99, 29, 49, 0.4) 0%, transparent 70%)"
          }}
        >
          <div
            style={{
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "1px solid rgba(245, 244, 240, 0.2)",
              animation: "pulse-aura 8s infinite alternate"
            }}
          />
        </div>
      )}
    </div>
  );
}
