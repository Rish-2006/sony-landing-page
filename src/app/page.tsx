import Navbar from "@/components/Navbar";
import CanvasSequence from "@/components/CanvasSequence";
import StorytellingOverlay from "@/components/StorytellingOverlay";

export default function Home() {
  return (
    <main className="relative bg-primary-bg min-h-screen text-white font-sans selection:bg-sony-blue/50">
      <Navbar />
      
      {/* 
        The CanvasSequence is sticky and pinned to the background.
        It listens to global scroll progress to update its frame.
      */}
      <CanvasSequence />

      {/* 
        The StorytellingOverlay provides the 400vh scroll space 
        and the text layers that animate in and out over the canvas.
      */}
      <div className="relative w-full z-10 pointer-events-none -mt-[100vh]">
        <StorytellingOverlay />
      </div>

      {/* Footer / Bottom of page spacer */}
      <footer className="bg-primary-bg h-screen flex flex-col items-center justify-center border-t border-white/5 relative z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,80,255,0.1)_0%,rgba(5,5,5,1)_70%)]" />
        <h3 className="text-2xl font-semibold mb-4 z-10">Experience silence like never before.</h3>
        <p className="text-white/40 mb-8 z-10 text-sm">Sony, WH-1000XM6, and the Sony logo are registered trademarks.</p>
      </footer>
    </main>
  );
}
