import Image from 'next/image'; import { useState } from 'react'; import agents from '@/data/agents.json';

export default function Home() { const [selectedAgent, setSelectedAgent] = useState(null);

const handleAgentClick = (agent) => { setSelectedAgent(agent); };

return ( <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"> {/* Operaterka */} <div className="relative z-10 flex flex-col items-center"> <div className="rounded-full overflow-hidden border-4 border-green-400 w-[300px] h-[300px]"> <Image src="/operator_live.png" alt="Operaterka" width={300} height={300} /> </div> <div className="mt-4 p-4 rounded-xl bg-white text-black w-[90vw] max-w-xl shadow-xl"> <p>Dobrodošli u pretragu Matrixa na gde-kako.rs način...</p> </div> </div>

{/* Agent baloni */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {agents.map((agent, i) => {
      const angle = (i / agents.length) * 2 * Math.PI;
      const radius = 250 + (agent.relevantnost || 1) * 20;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const size = 120 + (agent.relevantnost || 1) * 10;

      return (
        <div
          key={agent.id}
          className="absolute flex flex-col items-center cursor-pointer pointer-events-auto"
          onClick={() => handleAgentClick(agent)}
          style={{
            left: `calc(50% + ${x}px - ${size / 2}px)`,
            top: `calc(50% + ${y}px - ${size / 2}px)`
          }}
        >
          <div
            className="rounded-full overflow-hidden border-2 border-white shadow-lg"
            style={{ width: size, height: size }}
          >
            <Image src={agent.slike[0]} alt={agent.ime} width={size} height={size} />
          </div>
          <p className="text-sm mt-2 text-center max-w-[100px]">{agent.odgovor?.slice(0, 60) || 'Odgovor uskoro...'}</p>
        </div>
      );
    })}

    {/* SVG linije */}
    <svg className="absolute w-full h-full z-0">
      {agents.map((_, i) => {
        const angle = (i / agents.length) * 2 * Math.PI;
        const radius = 250 + (_.relevantnost || 1) * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <line
            key={i}
            x1="50%" y1="50%"
            x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`}
            stroke="white"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  </div>

  {/* Modal prikaz odgovora */}
  {selectedAgent && (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl max-w-xl w-[90vw] relative">
        <button onClick={() => setSelectedAgent(null)} className="absolute top-2 right-4 text-xl">×</button>
        <h2 className="text-xl font-bold mb-2">{selectedAgent.ime}</h2>
        <p>{selectedAgent.odgovor}</p>
      </div>
    </div>
  )}
</div>

); }


