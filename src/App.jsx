import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import HeroOverlay from "./components/HeroOverlay";
import CollectionShowcase from "./components/CollectionShowcase";
import ObjectShowcase3D from "./components/ObjectShowcase3D";
import EditorialCampaign from "./components/EditorialCampaign";
import BrandVision from "./components/BrandVision";
import ContactFooter from "./components/ContactFooter";
import AtelierDrawer from "./components/AtelierDrawer";

export default function App() {
  const [atelierOpen, setAtelierOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("NOIR");

  // Initialize Lenis smooth scroll for buttery luxury scrolling
  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    } catch (err) {
      console.warn("Lenis init skipped:", err);
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  const handleOpenAtelier = (collectionName = "NOIR") => {
    setSelectedCollection(collectionName);
    setAtelierOpen(true);
  };

  const handleExploreScroll = () => {
    const el = document.getElementById("collections");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08080A] text-[#F5F4F0] selection:bg-[#631D31] selection:text-white">
      {/* Subtle Film Grain Noise Texture */}
      <div className="film-grain" aria-hidden="true" />

      {/* Haute-Couture Navbar */}
      <Navbar onOpenAtelier={handleOpenAtelier} />

      <main>
        {/* Section A: Cinematic Hero Opening with 3D Central Form */}
        <section
          id="hero"
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            minHeight: "720px",
            overflow: "hidden"
          }}
        >
          {/* Central 3D Kinetic Liquid-Chrome Sculpture Scene */}
          <Hero3D />

          {/* Full-Screen Typography & Interface Overlay */}
          <HeroOverlay
            onExploreClick={handleExploreScroll}
            onOpenAtelier={handleOpenAtelier}
          />
        </section>

        {/* Section B: The Collection (NOIR, FLUX, CHROME) */}
        <CollectionShowcase onOpenAtelier={handleOpenAtelier} />

        {/* Section C: 3D Interactive Fashion Atelier Object */}
        <ObjectShowcase3D onOpenAtelier={handleOpenAtelier} />

        {/* Section D: Editorial Campaign (FORM IN MOTION, AFTER DARK, FUTURE HERITAGE) */}
        <EditorialCampaign onOpenAtelier={handleOpenAtelier} />

        {/* Section E: Brand Vision & 3D Undulating Silk Mesh */}
        <BrandVision />
      </main>

      {/* Section F: Final Contact Section & Dramatic Wordmark Footer */}
      <ContactFooter onOpenAtelier={handleOpenAtelier} />

      {/* Interactive VIP Atelier Drawer */}
      <AtelierDrawer
        isOpen={atelierOpen}
        onClose={() => setAtelierOpen(false)}
        initialCollection={selectedCollection}
      />
    </div>
  );
}
