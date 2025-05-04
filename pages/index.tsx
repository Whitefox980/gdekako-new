import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const dial = new Audio('/sounds/dial.mp3')
    dial.play()
    const sequence = [1000, 1000, 1000, 1500, 1000]
    let total = 0

    sequence.forEach((delay, index) => {
      setTimeout(() => setStep(index + 1), total)
      total += delay
    })

    setTimeout(() => setStep(99), total + 500)
  }, [])

  return (
    <div style={{
      position: 'relative',
      backgroundColor: 'black',
      color: 'lime',
      fontFamily: 'monospace',
      minHeight: '100vh',
      overflow: 'hidden',
    }}>
      <MatrixRain />

      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 10,
      }}>
        {step < 99 && <div>
          <p>Biranje veze...</p>
          <p style={{ fontSize: 30 }}>{'.'.repeat(step)}</p>
        </div>}

        {step === 99 && (
          <div style={{ textAlign: 'center' }}>
            <Image src="/images/operator.png" alt="Operator" width={200} height={200} />
            <p style={{ marginTop: 20 }}>Dobrodošli u <b>Matrix</b></p>
            <p>Veza sa sistemom <b>gde-kako.rs</b> je uspostavljena.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function MatrixRain() {
  return (
    <canvas id="matrixCanvas" style={{
      position: 'absolute',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'none',
    }} />
  )
}

if (typeof window !== 'undefined') {
  setTimeout(() => {
    const canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const letters = 'アァイィウエカサシスセタチッツナニハヒフヘホマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split('')
    const fontSize = 16
    const columns = canvas.width / fontSize
    const drops: number[] = []
    for (let x = 0; x < columns; x++) drops[x] = 1

    function draw() {
      if (!ctx) return
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0F0'
      ctx.font = fontSize + 'px monospace'
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    setInterval(draw, 50)
  }, 1000)
}
