import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [showOperator, setShowOperator] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [ready, setReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const tryAutoPlay = () => {
      if (audioRef.current) {
        audioRef.current.playbackRate = 1.5
        audioRef.current.play()
          .then(() => {
            audioRef.current!.onended = () => {
              setShowOperator(true)
              setTimeout(() => setShowChat(true), 1000)
            }
            setReady(true)
          })
          .catch(() => {
            // Ako autoplay ne uspe, traži klik
            setReady(false)
          })
      }
    }

    tryAutoPlay()
    const listener = () => {
      if (audioRef.current && !ready) {
        audioRef.current.playbackRate = 1.5
        audioRef.current.play().then(() => {
          audioRef.current!.onended = () => {
            setShowOperator(true)
            setTimeout(() => setShowChat(true), 1000)
          }
          setReady(true)
        })
      }
    }
    document.body.addEventListener('click', listener)

    return () => document.body.removeEventListener('click', listener)
  }, [ready])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', textAlign: 'center', paddingTop: 50 }}>
      <audio ref={audioRef} src="/sounds/dial.mp3" preload="auto" />
      
      {showOperator ? (
        <div style={{ transition: 'opacity 1s' }}>
          <Image
            src="/operator_live.png"
            alt="Operaterka"
            width={300}
            height={300}
            style={{ borderRadius: '50%', border: '2px solid green' }}
          />
          <h2 style={{ marginTop: 20 }}>Dobrodošli u Matrix gde-kako.rs</h2>
        </div>
      ) : !ready && (
        <button style={{ padding: 20, fontSize: 18 }} onClick={() => {}}>
          Klikni da započneš
        </button>
      )}

      {showChat && (
        <div style={{ marginTop: 30 }}>
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
