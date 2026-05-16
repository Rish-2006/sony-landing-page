"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isScrolled ? 1 : 0,
        y: isScrolled ? 0 : -10,
        backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.75)" : "rgba(5, 5, 5, 0)"
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-3 backdrop-blur-md border-b border-white/5`}
      style={{ pointerEvents: isScrolled ? "auto" : "none" }}
    >
      {/* Left: Product Title */}
      <div className="flex items-center w-1/4">
        <span className="font-medium text-lg tracking-tight text-white/90">WH‑1000XM6</span>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex items-center justify-center space-x-8 text-sm font-medium text-white/60 w-2/4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Overview</button>
        <button onClick={() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Technology</button>
        <button onClick={() => window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Noise Cancelling</button>
        <button onClick={() => window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Specs</button>
        <button onClick={() => window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Buy</button>
      </div>

      {/* Right: CTA */}
      <div className="flex items-center justify-end w-1/4">
        <button className="group relative px-5 py-2 rounded-full overflow-hidden font-medium text-sm">
          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
          <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-[#0050FF]/50 to-[#00D6FF]/50 -z-10 group-hover:from-[#0050FF] group-hover:to-[#00D6FF] transition-all duration-300" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#0050FF] to-[#00D6FF] blur-md -z-20" />
          <span className="relative z-10 text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Experience WH‑1000XM6</span>
        </button>
      </div>
    </motion.nav>
  );
}
