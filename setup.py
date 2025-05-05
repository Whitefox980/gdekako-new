import os

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

files = {
    'pages/index.tsx': '''
import { useState } from 'react'
import ChatForm from '@/components/ChatForm'
import Image from 'next/image'

export default function Home() {
  const [pitanje, setPitanje] = useState('')
  const [odgovori, setOdgovori] = useState<{ime: string, odgovor: string}[]>([])
  const [loading, setLoading] = useState(false)

  const postaviPitanje = async () => {
    if (!pitanje.trim()) return
    setLoading(true)
    const res = await fetch('/api/multirezon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pitanje }),
    })
    const data = await res.json()
    setOdgovori(data.odgovori)
    setLoading(false)
  }

  return (
    <div className="matrix-bg min-h-screen flex flex-col items-center pt-8 px-4">
      <div className="text-center">
        <Image src="/images/operator_live.png" alt="Operator" width={300} height={300} className="rounded-full border-4 border-green-600" />
        <h1 className="text-2xl text-white mt-4 font-bold">Dobro Došli u AI svet</h1>
        <p className="text-lg text-green-300">Gde-kako.rs — Odgovora na pitanja specijalnih AI agenata</p>
      </div>

      <ChatForm pitanje={pitanje} setPitanje={setPitanje} onSubmit={postaviPitanje} loading={loading} />

      <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-3xl">
        {odgovori.map((o, i) => (
          <div key={i} className="bg-white/10 text-white border border-green-500 rounded-xl p-4 w-full hover:bg-white/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Image src={`/images/${o.ime.toLowerCase()}.png`} alt={o.ime} width={50} height={50} className="rounded-full border border-green-400" />
              <span className="font-semibold">{o.ime}</span>
            </div>
            <p>{o.odgovor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
''',

    'components/ChatForm.tsx': '''
interface Props {
  pitanje: string
  setPitanje: (v: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function ChatForm({ pitanje, setPitanje, onSubmit, loading }: Props) {
  return (
    <div className="flex gap-2 mt-6 w-full max-w-xl">
      <input
        type="text"
        value={pitanje}
        onChange={(e) => setPitanje(e.target.value)}
        className="flex-1 px-4 py-2 rounded-l-xl border border-green-400 text-black"
        placeholder="Postavite pitanje..."
      />
      <button
        onClick={onSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-xl"
        disabled={loading}
      >
        {loading ? '...čeka se' : 'Pitaj'}
      </button>
    </div>
  )
}
''',

    'styles/globals.css': '''
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #000;
  color: white;
}

.matrix-bg {
  background-image: url('/images/matrix-bg.jpg');
  background-size: cover;
  background-attachment: fixed;
  opacity: 0.95;
}
''',
}

def create_structure():
    for path, content in files.items():
        create_file(path, content)

if __name__ == '__main__':
    create_structure()
