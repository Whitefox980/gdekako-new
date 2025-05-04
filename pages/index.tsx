import agents from '@/data/agents.json';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const audio = new Audio('/sounds/dial.mp3');
    audio.play();
    setTimeout(() => setShowChat(true), 2000);
  }, []);

  const radius = 180;

  return (
    <div className="relative h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Operaterka u centru */}
      <div className="absolute z-10 flex flex-col items-center">
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-green-500">
          <Image src="/images/operator_live.png" alt="Operaterka" width={300} height={300} />
        </div>
        {showChat && (
          <div className="mt-4 bg-white text-black rounded-xl p-4 shadow-lg w-[300px] text-center">
            <p>Dobro došli u pretragu Matrixa na gde-kako.rs način</p>
          </div>
        )}
      </div>

      {/* Agenti u krugovima oko operaterke */}
      {agents.map((agent, index) => {
        const angle = (2 * Math.PI / agents.length) * index;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return (
          <div
            key={agent.id}
            className="absolute flex flex-col items-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              transition: 'transform 0.3s',
            }}
          >
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-cyan-400">
              <Image src={agent.slike[0]} alt={agent.ime} width={100} height={100} />
            </div>
            <p className="text-xs text-center mt-1 max-w-[100px]">{agent.opis.slice(0, 40)}...</p>
          </div>
        );
      })}
    </div>
  );
}
