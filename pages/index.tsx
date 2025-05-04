// pages/index.tsx
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [showOperator, setShowOperator] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const clickedRef = useRef(false)

  const handleStart = () => {
    if (clickedRef.current) return
    clickedRef.current = true

    // Pusti zvuk
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error('Autoplay error:', err))

      audioRef.current.onended = () => {
        setShowOperator(true)
        setTimeout(() => setShowChat(true), 1000) // Mali delay pre chata
      }
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleStart)
    return () => document.body.removeEventListener('click', handleStart)
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', textAlign: 'center', paddingTop: 50 }}>
      <audio ref={audioRef} src="/sounds/dial.mp3" preload="auto" />
      
      {showOperator && (
        <div style={{ opacity: 1, transition: 'opacity 1s' }}>
          <Image
            src="/operator_live.png"
            alt="Operaterka"
            width={300}
            height={300}
            style={{ borderRadius: '50%', border: '2px solid green' }}
          />
          <h2 style={{ marginTop: 20 }}>Dobrodošli u Matrix gde-kako.rs</h2>
        </div>
      )}

      {showChat && (
        <div style={{ marginTop: 30 }}>
          {/* Ovde ubaci svoju Chat komponentu */}
          <input
            type="text"
            placeholder="Unesi svoje pitanje..."
            style={{ padding: 10, width: '80%', maxWidth: 400, borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  )
}
