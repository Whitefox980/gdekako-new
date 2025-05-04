
import { useEffect, useState } from 'react'
import Image from 'next/image'
import agents from '@/data/agents.json'

export default function Home() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = new Audio("/sounds/dial.mp3")
    audio.playbackRate = 1.8
    audio.play()
    setTimeout(() => setStarted(true), 3000)
  }, [])

  return (
    <div>
      {!started ? (
        <div className="fade-in" style={{ textAlign: "center", paddingTop: "20%", color: "#0f0" }}>
          <h2>Uspostavljanje veze sa Centralom...</h2>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 20 }}>
          <Image
            src="/images/operator_live.png"
            alt="Operater"
            width={300}
            height={300}
            style={{ borderRadius: "50%" }}
          />
          <h2 style={{ marginTop: 10, color: "#0f0" }}>-- Dobro Došli u Ai svet --<br/>Gde-kako.rs<br/>Odgovora na pitanja<br/>Specijalnih Ai Agenata</h2>
        </div>
      )}
    </div>
  )
}
