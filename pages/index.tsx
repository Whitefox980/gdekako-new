import { useEffect, useState } from 'react'
import Image from 'next/image'
import agents from '@/data/agents.json'

export default function Home() {
  const [audioPlayed, setAudioPlayed] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const playSoundAndStart = () => {
    if (!audioPlayed) {
      const audio = new Audio('/sounds/dial.mp3')
      audio.play()
      setAudioPlayed(true)
    }
  }

  return (
    <div
      onClick={playSoundAndStart}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      {!audioPlayed && (
        <div className="text-center animate-pulse text-sm absolute top-5">
          Dodirnite ekran za početak...
        </div>
      )}

      <div className="relative w-full h-[80vh] flex items-center justify-center">
        {/* Operator u centru */}
        <div className="w-72 h-72 rounded-full border-4 border-green-400 flex items-center justify-center relative z-10">
          <Image
            src="/operator_live.png"
            alt="Operaterka"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>

        {/* Agenti u krugu */}
        {showChat &&
          agents.map((agent, i) => {
            const angle = (i / agents.length) * 2 * Math.PI
            const radius = 200
            const x = radius * Math.cos(angle)
            const y = radius * Math.sin(angle)
            const isSelected = selectedAgent === agent.id
            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`absolute transition-all duration-300 cursor-pointer ${
                  isSelected ? 'z-20 scale-110' : 'z-0'
                }`}
                style={{
                  top: `calc(50% + ${y}px - 50px)`,
                  left: `calc(50% + ${x}px - 50px)`
                }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400">
                  <Image
                    src={agent.slike[0]}
                    alt={agent.ime}
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                </div>
                <p className="text-center text-xs mt-1 w-24 truncate">
                  {isSelected
                    ? agent.opis
                    : agent.opis.length > 40
                    ? agent.opis.slice(0, 40) + '...'
                    : agent.opis}
                </p>
              </div>
            )
          })}
      </div>

      {/* Chat prikaz */}
      {showChat && (
        <div className="mt-6 p-4 rounded-2xl border border-gray-700 bg-[#111] max-w-xl text-center">
          <p className="text-green-400 font-mono">
            Dobro došli u pretragu Matrixa na gde-kako.rs način...
          </p>
          <input
            type="text"
            placeholder="Postavite pitanje..."
            className="w-full mt-3 p-2 bg-black text-white border border-green-600 rounded-md"
          />
        </div>
      )}
    </div>
  )
}
