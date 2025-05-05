import Image from 'next/image'
import agents from '@/data/agents.json'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white font-mono">
      <div className="absolute inset-0 z-0 animate-matrix" />
      <div className="relative z-10 flex flex-col items-center justify-start pt-24">
        <div className="bg-opacity-80 bg-black p-4 rounded-full animate-pulse">
          <Image src="/images/operator_live.png" alt="Operaterka" width={300} height={300} className="rounded-full" />
        </div>
        <div className="mt-4 text-center text-lg tracking-widest animate-fade-in">
          <p className="uppercase text-green-400">Dobro Došli u Ai svet</p>
          <p className="text-xl font-bold">Gde-kako.rs</p>
          <p className="text-sm text-gray-400">Odgovora na pitanja</p>
          <p className="text-green-300">Specijalnih Ai Agenata</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4 animate-slide-up">
          {agents.map(agent => (
            <div key={agent.id} className="flex flex-col items-center bg-zinc-800 bg-opacity-50 p-4 rounded-full hover:scale-105 transition">
              <Image src={agent.slike[0]} alt={agent.ime} width={100} height={100} className="rounded-full" />
              <p className="mt-2 text-sm">{agent.ime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}