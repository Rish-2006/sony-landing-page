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
  
  // HERO (0% - 25%)
  // Fades out from 15% to 25%
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-20%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  // ENGINEERING REVEAL (15% - 40%)
  // Fades in 15% to 20%, holds to 35%, fades out to 40%
  const engOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const engY = useTransform(scrollYProgress, [0.15, 0.4], ["10%", "-10%"]);

  // NOISE CANCELLING (40% - 65%)
  const ncOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const ncY = useTransform(scrollYProgress, [0.4, 0.65], ["10%", "-10%"]);

  // SOUND & UPSCALING (65% - 85%)
  const soundOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const soundY = useTransform(scrollYProgress, [0.65, 0.85], ["10%", "-10%"]);

  // REASSEMBLY & CTA (85% - 100%)
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 1], ["10%", "0%"]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "400vh", position: "relative" }}>
      
      {/* --- HERO (0-25%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        {/* Subtle glow behind hero text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[400px] bg-[#050815] blur-[120px] rounded-full -z-10" />
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-4 drop-shadow-lg leading-tight pointer-events-none">
          Sony WH‑1000XM6
        </h1>
        
        <p className="text-2xl md:text-3xl font-medium text-white/80 tracking-wide mb-6">
          Silence, perfected.
        </p>
        
        <p className="text-lg md:text-xl text-white/40 max-w-2xl text-center">
          Flagship wireless noise cancelling, re‑engineered for a world that never stops.
        </p>
      </motion.div>

      {/* --- ENGINEERING REVEAL (15-40%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col md:flex-row justify-between items-center pointer-events-none px-8 md:px-24"
        style={{ opacity: engOpacity, y: engY }}
      >
        <div className="max-w-md bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/5">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-sony-cyan/60">
            Precision-engineered for silence.
          </h2>
          <div className="space-y-4 text-white/60 text-lg leading-relaxed">
            <p>Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.</p>
            <p>Every component is tuned for balance, power, and comfort—hour after hour.</p>
          </div>
        </div>
        
        <div className="hidden md:block w-1/3 aspect-square relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 mix-blend-overlay" />
           <img src="/images/engineering_closeup.png" alt="Engineering Detail" className="object-cover w-full h-full opacity-90" />
        </div>
      </motion.div>

      {/* --- NOISE CANCELLING (40-65%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col-reverse md:flex-row justify-between items-center pointer-events-none px-8 md:px-24"
        style={{ opacity: ncOpacity, y: ncY }}
      >
        <div className="hidden md:block w-1/3 aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
           <div className="absolute inset-0 bg-gradient-to-tr from-sony-blue/20 to-transparent z-10 mix-blend-overlay" />
           <img src="/images/noise_cancelling_lifestyle.png" alt="Noise Cancelling Lifestyle" className="object-cover w-full h-full opacity-90" />
        </div>
        
        <div className="max-w-md bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/5 text-left md:text-right">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-sony-cyan/60">
            Adaptive noise cancelling, redefined.
          </h2>
          <ul className="space-y-4 text-white/60 text-lg leading-relaxed">
            <li>Multi-microphone array listens in every direction.</li>
            <li>Real-time noise analysis adjusts to your environment.</li>
            <li>Your music stays pure—planes, trains, and crowds fade away.</li>
          </ul>
        </div>
      </motion.div>

      {/* --- SOUND & UPSCALING (65-85%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col md:flex-row justify-between items-center pointer-events-none px-8 md:px-24"
        style={{ opacity: soundOpacity, y: soundY }}
      >
        <div className="max-w-md bg-black/20 backdrop-blur-sm p-8 rounded-2xl border border-white/5">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-sony-cyan/60">
            Immersive, lifelike sound.
          </h2>
          <div className="space-y-4 text-white/60 text-lg leading-relaxed">
            <p>High-performance drivers unlock detail, depth, and texture in every track.</p>
            <p>AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.</p>
          </div>
        </div>
        
        <div className="hidden md:block w-1/3 aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
           <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent z-10 mix-blend-overlay" />
           <img src="/images/studio_sound_product.png" alt="Studio Sound" className="object-cover w-full h-full opacity-90" />
        </div>
      </motion.div>

      {/* --- REASSEMBLY & CTA (85-100%) --- */}
      <motion.div 
        className="fixed inset-0 flex flex-col items-center justify-end pb-32 text-center pointer-events-none px-6"
        style={{ opacity: ctaOpacity, y: ctaY }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-[#0050FF]/20 to-transparent -z-10 pointer-events-none" />
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-4">
          Hear everything. Feel nothing else.
        </h2>
        <p className="text-xl text-white/60 font-medium mb-12">
          WH‑1000XM6. Designed for focus, crafted for comfort.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto">
          <button className="group relative px-8 py-4 rounded-full overflow-hidden font-medium text-lg w-full sm:w-auto shadow-lg shadow-sony-blue/20 transition-transform duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
            <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-sony-blue to-sony-cyan -z-10" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sony-blue to-sony-cyan blur-md -z-20" />
            <span className="relative z-10 text-white font-semibold group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Experience WH‑1000XM6</span>
          </button>
          
          <button className="text-white/70 hover:text-white font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">
            See full specs
          </button>
        </div>
        <p className="mt-8 text-sm text-white/40">Engineered for airports, offices, and everything in between.</p>
      </motion.div>

    </div>
  );
}
