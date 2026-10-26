import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioAmbiance() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const notes = [55.0, 110.0, 164.81, 220.0, 329.63];
        const newOscs = [];

        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.08 + idx * 0.02, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

          if (panner) {
            panner.pan.setValueAtTime((idx - 2) * 0.35, ctx.currentTime);
            osc.connect(filter);
            filter.connect(panner);
            panner.connect(masterGain);
          } else {
            osc.connect(filter);
            filter.connect(masterGain);
          }

          osc.start();
          newOscs.push(osc);
          newOscs.push(lfo);
        });

        oscillatorsRef.current = newOscs;
        setIsPlaying(true);
      } catch (err) {
        console.warn("AudioContext init error:", err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        setTimeout(() => {
          oscillatorsRef.current.forEach(osc => {
            try { osc.stop(); } catch (_) {}
          });
          oscillatorsRef.current = [];
          setIsPlaying(false);
        }, 1300);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (_) {}
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute Haute-Couture Soundscape" : "Enable Haute-Couture Soundscape"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.35rem clamp(0.5rem, 1.2vw, 0.8rem)",
        borderRadius: "9999px",
        border: "1px solid rgba(245, 244, 240, 0.12)",
        backgroundColor: "rgba(8, 8, 10, 0.65)",
        backdropFilter: "blur(12px)",
        color: "#F5F4F0",
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        letterSpacing: "0.08em",
        cursor: "pointer",
        transition: "all 0.3s ease",
        whiteSpace: "nowrap"
      }}
    >
      {isPlaying ? (
        <>
          <Volume2 size={13} color="#00E5FF" className="animate-pulse" />
          <span className="audio-toggle-text" style={{ color: "#00E5FF" }}>AMUSE-OREILLE</span>
          <span style={{ display: "inline-flex", gap: "2px", alignItems: "flex-end", height: "10px" }}>
            <span style={{ width: "2px", height: "100%", background: "#00E5FF", animation: "bounce 0.8s infinite alternate" }}></span>
            <span style={{ width: "2px", height: "60%", background: "#00E5FF", animation: "bounce 0.6s infinite alternate 0.2s" }}></span>
            <span style={{ width: "2px", height: "80%", background: "#00E5FF", animation: "bounce 0.9s infinite alternate 0.4s" }}></span>
          </span>
        </>
      ) : (
        <>
          <VolumeX size={13} style={{ opacity: 0.6 }} />
          <span className="audio-toggle-text" style={{ opacity: 0.7 }}>SOUNDSCAPE</span>
        </>
      )}
    </button>
  );
}
