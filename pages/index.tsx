import { useState } from "react"; import Image from "next/image";

const agents = [ { name: "Marko Pravni", image: "/images/agents/marko.png", preview: "Za raskid ugovora o zakupu...", full: "Za raskid ugovora o zakupu potrebno je..." }, { name: "Jelena Turistički", image: "/images/agents/jelena.png", preview: "Za putovanje u Grčku...", full: "Za putovanje u Grčku potrebno vam je..." }, { name: "Teodora Tehnološka", image: "/images/agents/teodora.png", preview: "Najbolji budžetski telefon...", full: "Najbolji budžetski telefon trenutno na tržištu je..." } ];

export default function Home() { const [selected, setSelected] = useState(null);

return ( <div className="relative min-h-screen bg-black text-green-400 font-mono overflow-hidden"> <div className="absolute inset-0 bg-[url('/images/matrix-bg.jpg')] bg-cover opacity-10 z-0" /> <div className="relative z-10 flex flex-col items-center pt-10 space-y-6"> <div className="rounded-full border-4 border-green-500 p-2 w-[300px] h-[300px] overflow-hidden"> <Image src="/images/operator_live.png" alt="Operator" width={300} height={300} className="rounded-full" /> </div> <div className="bg-black/60 rounded-xl p-4 w-full max-w-lg"> <input
type="text"
placeholder="Unesite pitanje..."
className="w-full p-3 rounded bg-black border border-green-500 text-green-400 placeholder-green-600"
/> </div>

<div className="flex flex-wrap justify-center gap-6 px-4 pt-6">
      {agents.map((agent, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center cursor-pointer transition-transform duration-300 ${selected === idx ? "scale-110" : "hover:scale-105"}`}
          onClick={() => setSelected(selected === idx ? null : idx)}
        >
          <div className={`rounded-full border-4 border-green-500 overflow-hidden ${selected === idx ? "w-40 h-40" : "w-24 h-24"}`}>
            <Image src={agent.image} alt={agent.name} width={160} height={160} className="object-cover w-full h-full" />
          </div>
          <p className="text-sm mt-2 text-center max-w-[120px]">{selected === idx ? agent.full : agent.preview}</p>
        </div>
      ))}
    </div>
  </div>
</div>

); }


