"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StorytellingOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Total container height is 400vh to give plenty of scroll room
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ---------------------------------------------------------
  // SCROLL MAPPINGS FOR EACH SECTION
  // ---------------------------------------------------------
  
  // HERO (0% - 15%)
  // Fades out from 10% to 15%
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-5%"]);

  // ENGINEERING REVEAL (15% - 40%)
  // Fades in 15-20%, holds 20-35%, fades out 35-40%
  const engOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const engX = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], ["-5%", "0%", "0%", "-5%"]);

  // NOISE CANCELLING (40% - 65%)
  // Fades in 40-45%, holds 45-60%, fades out 60-65%
  const ncOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const ncX = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], ["5%", "0%", "0%", "5%"]);

  // SOUND & UPSCALING (65% - 85%)
  // Fades in 65-70%, holds 70-80%, fades out 80-85%
  const soundOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const soundX = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], ["-5%", "0%", "0%", "-5%"]);

  // REASSEMBLY & CTA (85% - 100%)
  // Fades in 85-90%, holds to 100%
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.9], ["5%", "0%"]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "400vh" }}>
      
      {/* --- HERO (0-15%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Extremely subtle radial glow behind hero content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#050815_0%,transparent_70%)] opacity-80 -z-10" />
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 mb-2 drop-shadow-xl">
          Sony WH‑1000XM6
        </h1>
        
        <p className="text-2xl md:text-3xl font-medium text-white/80 tracking-wide mb-6">
          Silence, perfected.
        </p>
        
        <p className="text-lg md:text-xl text-white/60 max-w-2xl text-center">
          Flagship wireless noise cancelling, re‑engineered for a world that never stops.
        </p>
      </motion.div>

      {/* --- ENGINEERING REVEAL (15-40%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col justify-center items-start pointer-events-none px-8 md:px-[10%]"
        style={{ opacity: engOpacity, x: engX }}
      >
        <div className="max-w-md bg-[#0A0A0C]/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00D6FF]/80">
            Precision-engineered for silence.
          </h2>
          <div className="space-y-4 text-white/60 text-lg leading-relaxed">
            <p>Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.</p>
            <p>Every component is tuned for balance, power, and comfort—hour after hour.</p>
          </div>
        </div>
      </motion.div>

      {/* --- NOISE CANCELLING (40-65%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col justify-center items-end pointer-events-none px-8 md:px-[10%]"
        style={{ opacity: ncOpacity, x: ncX }}
      >
        <div className="max-w-md bg-[#0A0A0C]/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl text-left md:text-right">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00D6FF]/80">
            Adaptive noise cancelling, redefined.
          </h2>
          <ul className="space-y-4 text-white/60 text-lg leading-relaxed text-left md:text-right">
            <li>Multi-microphone array listens in every direction.</li>
            <li>Real-time noise analysis adjusts to your environment.</li>
            <li>Your music stays pure—planes, trains, and crowds fade away.</li>
          </ul>
        </div>
      </motion.div>

      {/* --- SOUND & UPSCALING (65-85%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col justify-center items-start pointer-events-none px-8 md:px-[10%]"
        style={{ opacity: soundOpacity, x: soundX }}
      >
        <div className="max-w-md bg-[#0A0A0C]/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00D6FF]/80">
            Immersive, lifelike sound.
          </h2>
          <div className="space-y-4 text-white/60 text-lg leading-relaxed">
            <p>High-performance drivers unlock detail, depth, and texture in every track.</p>
            <p>AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.</p>
          </div>
        </div>
      </motion.div>

      {/* --- REASSEMBLY & CTA (85-100%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-end pb-[10vh] text-center pointer-events-none px-6"
        style={{ opacity: ctaOpacity, y: ctaY }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,#0050FF_0%,transparent_60%)] opacity-20 -z-10 pointer-events-none mix-blend-screen" />
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90 mb-4 drop-shadow-xl">
          Hear everything. Feel nothing else.
        </h2>
        <p className="text-xl text-white/60 font-medium mb-12">
          WH‑1000XM6. Designed for focus, crafted for comfort.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-8 pointer-events-auto">
          <button className="group relative px-8 py-4 rounded-full overflow-hidden font-medium text-lg w-full sm:w-auto shadow-2xl shadow-[#0050FF]/20 transition-transform duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
            <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-[#0050FF] to-[#00D6FF] -z-10" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#0050FF] to-[#00D6FF] blur-md -z-20" />
            <span className="relative z-10 text-white font-semibold group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Experience WH‑1000XM6</span>
          </button>
          
          <button className="text-white/60 hover:text-white font-medium transition-colors flex items-center gap-2">
            See full specs
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p className="mt-10 text-sm text-white/40 tracking-wide uppercase">Engineered for airports, offices, and everything in between.</p>
      </motion.div>

    </div>
  );
}
