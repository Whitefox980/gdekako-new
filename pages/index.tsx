import { useState } from 'react'
import Image from 'next/image'
import agents from '@/data/agents.json'

export default function Home() {
  const [responses, setResponses] = useState([])

  const handleAsk = async () => {
    const res = await fetch('/api/multirezon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pitanje: 'Gde mogu da vadim dokumenta u Novom Sadu?' })
    })
    const data = await res.json()
    setResponses(data.odgovori)
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-90 text-white font-mono relative overflow-hidden">
      {/* Matrix background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image src="/images/matrix-bg.png" alt="Matrix background" fill className="object-cover" priority />
      </div>

      {/* Chat and Operator */}
      <div className="relative z-10 flex flex-col items-center pt-10">
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-green-500 shadow-lg animate-pulse bg-black bg-opacity-60">
          <Image src="/images/operator_live.png" alt="Operaterka" width={300} height={300} />
        </div>
        <div className="mt-4 text-center text-lg leading-tight">
          <p className="text-green-300 font-bold">Dobro Došli u AI Svet</p>
          <p className="text-white">Gde-Kako.rs</p>
          <p className="text-sm text-gray-300">Odgovora na pitanja specijalnih AI agenata</p>
        </div>
        <button onClick={handleAsk} className="mt-6 px-6 py-2 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold shadow-md">
          PITAJ
        </button>
      </div>

      {/* Agents Preview */}
      <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-6 px-4">
        {agents.map(agent => {
          const answer = responses.find(r => r.agentId === agent.id)
          const hasResponse = !!answer
          return (
            <div
              key={agent.id}
              className={`relative flex flex-col items-center w-40 h-40 rounded-full shadow-lg border-2 p-2
                ${hasResponse ? 'border-green-400 animate-pulse' : 'border-gray-600 opacity-30'}
              `}
            >
              <Image
                src={`/images/${agent.slika}`}
                alt={agent.ime}
                width={120}
                height={120}
                className="rounded-full"
              />
              <span className="text-xs mt-2 font-semibold">{agent.ime}</span>
              {hasResponse && (
                <p className="text-[10px] mt-1 text-center text-green-200">{answer.odgovor.slice(0, 40)}...</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

