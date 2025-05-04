import React, { useState } from 'react';
import { useState, useEffect, useRef } from 'react'; import Image from 'next/image'; import agents from '@/data/agents.json';

export default function Home() { const [audioPlayed, setAudioPlayed] = useState(false); const [showChat, setShowChat] = useState(false); const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => { const timer = setTimeout(() => { setShowChat(true); }, 2000); return () => clearTimeout(timer); }, []);

useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;

const drawLines = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  agents.forEach((_, index) => {
    const angle = (index / agents.length) * 2 * Math.PI;
    const radius = 280;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(0,255,0,0.3)';
    ctx.stroke();
  });
};

drawLines();
window.addEventListener('resize', drawLines);
return () => window.removeEventListener('resize', drawLines);

}, []);

const playSound = () => { if (!audioPlayed) { const audio = new Audio('/sounds/dial.mp3'); audio.play(); setAudioPlayed(true); } };

return ( <div
className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
onClick={playSound}
> <canvas
ref={canvasRef}
className="absolute top-0 left-0 w-full h-full"
width={1000}
height={1000}
/>

{/* Operaterka */}
  <div className="relative z-10">
    <div className="rounded-full border-4 border-green-500 p-2">
      <Image
        src="/images/operator_live.png"
        alt="Operaterka"
        width={300}
        height={300}
        className="rounded-full"
      />
    </div>
    {showChat && (
      <div className="mt-4 bg-white text-black p-4 rounded-2xl max-w-md shadow-md text-center">
        <p className="font-semibold">Dobro došli u pretragu Matrixa na gde-kako.rs način.</p>
      </div>
    )}
  </div>

  {/* Agenti */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
    <div className="relative w-[700px] h-[700px]">
      {agents.map((agent, index) => {
        const angle = (index / agents.length) * 2 * Math.PI;
        const radius = 280;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return (
          <div
            key={agent.id}
            className="absolute flex flex-col items-center text-center"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Image
              src={`/images/${agent.slika}`}
              alt={agent.ime}
              width={120}
              height={120}
              className="rounded-full border-2 border-white"
            />
            <div className="mt-2 text-xs w-28 truncate">{agent.opis}</div>
          </div>
        );
      })}
    </div>
  </div>
</div>

); }


