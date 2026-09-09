import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ScratchCard({ onRevealed }: { onRevealed: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#888';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);
  }, []);

  const handleMouseMove = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    // Simple reveal logic
    if (Math.random() > 0.98) {
       setIsRevealed(true);
       onRevealed();
    }
  };

  return (
    <div className="relative w-64 h-32 border-4 border-dashed border-yellow-600">
      <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">WINNER!</div>
      <canvas ref={canvasRef} width={256} height={128} onMouseMove={handleMouseMove} className="absolute inset-0 cursor-pointer" />
    </div>
  );
}
