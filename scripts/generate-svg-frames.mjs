import fs from 'fs';
import path from 'path';

const NUM_FRAMES = 120;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'frames');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WIDTH = 1920;
const HEIGHT = 1080;

for (let i = 1; i <= NUM_FRAMES; i++) {
  // We want to simulate an explosion and reassembly
  // Let's make a simple visual: a circle that splits into 3 smaller circles then reassembles
  const progress = (i - 1) / (NUM_FRAMES - 1); // 0 to 1
  
  // Animation logic: 0 to 0.15 is hero. 0.15 to 0.4 explodes. 0.4 to 0.85 remains exploded/spins. 0.85 to 1 reassembles.
  let explosionFactor = 0;
  if (progress > 0.15 && progress < 0.4) {
    explosionFactor = (progress - 0.15) / 0.25; // 0 to 1
  } else if (progress >= 0.4 && progress <= 0.85) {
    explosionFactor = 1;
  } else if (progress > 0.85) {
    explosionFactor = 1 - ((progress - 0.85) / 0.15); // 1 to 0
  }

  // Smooth the explosion factor (ease-in-out)
  const easeFactor = explosionFactor < 0.5 ? 2 * explosionFactor * explosionFactor : 1 - Math.pow(-2 * explosionFactor + 2, 2) / 2;

  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  
  // Distance the parts travel
  const offset = easeFactor * 300;
  
  const svgContent = `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#050505" />
  
  <!-- Sub-components (Earcups, Headband, etc.) simulated by shapes -->
  <g transform="translate(${centerX}, ${centerY})">
    <!-- Left Earcup -->
    <circle cx="${-offset}" cy="0" r="100" fill="#111111" stroke="#333" stroke-width="2" />
    <text x="${-offset}" y="5" fill="#555" font-family="sans-serif" font-size="20" text-anchor="middle">L Cup</text>
    
    <!-- Right Earcup -->
    <circle cx="${offset}" cy="0" r="100" fill="#111111" stroke="#333" stroke-width="2" />
    <text x="${offset}" y="5" fill="#555" font-family="sans-serif" font-size="20" text-anchor="middle">R Cup</text>
    
    <!-- Headband -->
    <path d="M ${-100 - offset * 0.5} -100 Q 0 ${-300 - offset} ${100 + offset * 0.5} -100" fill="none" stroke="#222" stroke-width="40" stroke-linecap="round" />
    
    <!-- Drivers / Internals (Only visible when exploded) -->
    <circle cx="${-offset * 1.5}" cy="0" r="${50 * easeFactor}" fill="#0050FF" opacity="${easeFactor}" />
    <circle cx="${offset * 1.5}" cy="0" r="${50 * easeFactor}" fill="#00D6FF" opacity="${easeFactor}" />
  </g>
  
  <!-- Frame Counter (for debugging scroll) -->
  <text x="50" y="50" fill="#ffffff" opacity="0.3" font-family="sans-serif" font-size="24">Frame: ${i.toString().padStart(4, '0')} / 120 (Progress: ${(progress*100).toFixed(1)}%)</text>
</svg>`;

  const fileName = `frame_${i.toString().padStart(4, '0')}.svg`;
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), svgContent);
}

console.log(`Successfully generated ${NUM_FRAMES} frames in public/frames/`);
