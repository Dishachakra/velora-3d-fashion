// Curated editorial fashion photography assets for VELORA
// High-fashion, avant-garde, dark cinematic aesthetic

export const BRAND_INFO = {
  name: "VELORA",
  tagline: "Wear the Unordinary.",
  concept: "A futuristic luxury fashion label combining avant-garde clothing, editorial photography, sculptural 3D objects, and minimal digital experiences.",
  season: "AUTOMNE / HIVER 2026-27",
  edition: "N° 08 // THE EXOSKELETON SERIES",
  locations: ["MILANO", "PARIS", "TOKYO", "REYKJAVIK"],
  manifesto: "Fashion is not just what you wear. It is the space you occupy, the movement you create, and the future you imagine."
};

export const COLLECTIONS = [
  {
    id: "noir",
    title: "NOIR",
    subtitle: "Architectural Silhouettes & Monolithic Drapery",
    year: "2026/27",
    colorAccent: "#631D31",
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    lookImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    detailImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    description: "Monolithic cuts carved from dense midnight virgin wool, sculpted basalt leathers, and razor-sharp lapels that defy conventional geometry. NOIR explores the geometry of shadows and subterranean luxury.",
    specs: [
      { label: "Fabrication", value: "380gsm Double-Face Virgin Wool & Matte Nappa" },
      { label: "Hardware", value: "Blackened Brushed Titanium Fasteners" },
      { label: "Structure", value: "Internal Carbon-Composite Shoulder Architecture" },
      { label: "Production", value: "Limited Run of 24 Bespoke Ensembles" }
    ],
    looks: [
      {
        code: "LK-01",
        name: "Obsidian Mantle Coat",
        category: "Outerwear",
        price: "€4,850",
        img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
        material: "Structured Melton Wool / Lambskin"
      },
      {
        code: "LK-02",
        name: "Monolith Tailored Trousers",
        category: "Bottoms",
        price: "€1,950",
        img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        material: "Sculpted Barathea & Waxed Finish"
      },
      {
        code: "LK-03",
        name: "Shadow Facet Bodice",
        category: "Sculptural Atelier",
        price: "€3,600",
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        material: "Molded Leather & Laser-cut Organza"
      }
    ]
  },
  {
    id: "flux",
    title: "FLUX",
    subtitle: "Kinetic Drapery & Liquid Organza",
    year: "2026/27",
    colorAccent: "#3B82F6",
    heroImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80",
    lookImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    detailImage: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80",
    description: "Garments that breathe with human velocity. FLUX integrates undulating Japanese mulberry silk organza, parametric micro-pleating, and fluid drapes that transform their silhouette with every gust of wind.",
    specs: [
      { label: "Fabrication", value: "100% Organically Grown Mulberry Silk Organza" },
      { label: "Drape Ratio", value: "4.8:1 Kinetic Expansion Matrix" },
      { label: "Color Palette", value: "Liquid Alabaster, Pale Mercury, Deep Indigo" },
      { label: "Craftsmanship", value: "Over 120 Hours of Continuous Hand-Pleating" }
    ],
    looks: [
      {
        code: "LK-04",
        name: "Vapor Pleated Gown",
        category: "Runway",
        price: "€6,200",
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        material: "Layered Chiffon & Silk Habotai"
      },
      {
        code: "LK-05",
        name: "Cascade Ripple Cape",
        category: "Outerwear",
        price: "€3,400",
        img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
        material: "Fluid Cupro & Japanese Paper-Silk"
      },
      {
        code: "LK-06",
        name: "Hydro-Drape Tunic",
        category: "Tops",
        price: "€2,100",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        material: "Semi-translucent Microfiber Mesh"
      }
    ]
  },
  {
    id: "chrome",
    title: "CHROME",
    subtitle: "Specular Armor & Speculative Metallics",
    year: "2026/27",
    colorAccent: "#00E5FF",
    heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    lookImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    detailImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
    description: "Wearable sculptures bridging high-fashion couture and space-age metallurgy. Laser-sintered titanium wirecloth, hand-polished mirror silver breastplates, and electro-plated polymers engineered for zero friction.",
    specs: [
      { label: "Metallurgy", value: "Grade 5 Aeronautical Titanium & 999 Fine Silver Plating" },
      { label: "Reflectivity", value: "94.2% Specular Reflection Coefficient" },
      { label: "Weight", value: "Ultra-Lightweight Lattice Structure (580 grams total)" },
      { label: "Assembly", value: "Modular Magnetic Link Joints" }
    ],
    looks: [
      {
        code: "LK-07",
        name: "Mirror Carapace Corset",
        category: "Couture Sculpture",
        price: "€8,900",
        img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        material: "Hydro-Formed Polished Titanium"
      },
      {
        code: "LK-08",
        name: "Mercury Mesh Shroud",
        category: "Runway",
        price: "€5,100",
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        material: "Flexible Stainless Steel Micro-chain"
      },
      {
        code: "LK-09",
        name: "Alloy Pleat Skirt",
        category: "Bottoms",
        price: "€3,250",
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        material: "Mylar-infused Wool Twill"
      }
    ]
  }
];

export const CAMPAIGNS = [
  {
    id: "form-in-motion",
    number: "EDITORIAL 01",
    title: "FORM IN MOTION",
    photographer: "Elena Vance",
    location: "Concrete Quarry // Carrara",
    caption: "Capturing the split-second tension between structured stiffness and untamed kinetic freedom. High-shutter velocity exposes the aerodynamics of pleated silk.",
    quote: "When a garment moves, it writes poetry upon empty space.",
    imageLarge: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    imageSide: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    tag: "AERODYNAMICS // SILK"
  },
  {
    id: "after-dark",
    number: "EDITORIAL 02",
    title: "AFTER DARK",
    photographer: "Marcus Sterling",
    location: "Brutalist Vaults // Berlin",
    caption: "Deep midnight hues meet reflective chrome surfaces under stark monochromatic beams. An exploration of solitude, nocturnal armor, and sculptural poise.",
    quote: "Night is not the absence of light, but the theater of specular shadow.",
    imageLarge: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
    imageSide: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    tag: "OBSIDIAN // MONOLITH"
  },
  {
    id: "future-heritage",
    number: "EDITORIAL 03",
    title: "FUTURE HERITAGE",
    photographer: "Aoi Takahashi",
    location: "Kyoto Research Pavilion",
    caption: "Centuries-old artisanal Japanese weaving traditions fused with computational 3D generative patterns. The heritage of 1720 reimagined for 2040.",
    quote: "Tradition is not worshipping the ashes, but preserving the flame.",
    imageLarge: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80",
    imageSide: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tag: "PARAMETRIC // WEAVE"
  }
];

export const THREE_HOTSPOTS = [
  {
    id: "boning",
    title: "Shape-Memory Alloy Ribs",
    desc: "0.4mm nitinol wire boning that molds to body heat and retains sculptural contour permanently.",
    position: [0.65, 0.45, 0.75],
    screenPos: { x: "68%", y: "32%" }
  },
  {
    id: "closure",
    title: "Magnetic Zero-Friction Clasp",
    desc: "Neodymium core clasp mechanism engineered with aeronautical tolerances.",
    position: [0.0, -0.2, 0.95],
    screenPos: { x: "50%", y: "58%" }
  },
  {
    id: "drape",
    title: "Algorithmic Pleat Origami",
    desc: "Parametric folding matrix derived from biological phyllotaxis spirals.",
    position: [-0.75, 0.15, 0.6],
    screenPos: { x: "28%", y: "45%" }
  },
  {
    id: "finish",
    title: "Vapor-Deposited Mirror Sheen",
    desc: "Molecular chromium nanolayer resisting oxidation and reflecting 94% ambient light.",
    position: [0.35, -0.65, 0.65],
    screenPos: { x: "60%", y: "74%" }
  }
];

export const ATELIER_METRICS = [
  { value: "480+", label: "Hours per Bespoke Garment", detail: "Hand-finished by master couturiers in Paris" },
  { value: "100%", label: "Circular Titanium & Silk", detail: "Ethically reclaimed aerospace alloys" },
  { value: "12", label: "Editions Globally", detail: "Strict numbered provenance certificate" },
  { value: "0.2mm", label: "Precision Laser Tolerance", detail: "Seamless architectural joint integration" }
];
