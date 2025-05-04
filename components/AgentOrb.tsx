import Image from 'next/image'

interface AgentOrbProps {
  id: string
  ime: string
  opis: string
  slika: string
  x: number
  y: number
}

export default function AgentOrb({ id, ime, opis, slika, x, y }: AgentOrbProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}%`,
        left: `${x}%`,
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: 100,
      }}
    >
      <Image src={slika} alt={ime} width={80} height={80} style={{ borderRadius: '50%' }} />
      <div style={{ fontSize: 12 }}>{ime}</div>
    </div>
  )
}
