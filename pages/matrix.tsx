import { useEffect, useState } from 'react';

type Odgovor = {
  agentId: string;
  ime: string;
  odgovor: string;
};

export default function MatrixPage() {
  const [pitanje, setPitanje] = useState('');
  const [odgovori, setOdgovori] = useState<Odgovor[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!pitanje) return;
    setLoading(true);
    setOdgovori([]);

    const res = await fetch('/api/multirezon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pitanje }),
    });

    const data = await res.json();
    setOdgovori(data.odgovori || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Multirezonski Matrix Odgovori</h1>
      <textarea
        placeholder="Postavi pitanje svim agentima..."
        value={pitanje}
        onChange={(e) => setPitanje(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: 12, fontSize: 16 }}
      />
      <button onClick={handleSubmit} style={{ marginTop: 12, padding: '8px 16px' }}>
        Pošalji svima
      </button>

      {loading && <p style={{ marginTop: 24 }}>AIMatrix kalkuliše...</p>}

      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
        {odgovori.map((o, i) => (
          <div key={i} style={{ background: '#111', color: '#0f0', padding: 16, borderRadius: 12 }}>
            <h3>{o.ime}</h3>
           <p style={{ whiteSpace: 'pre-wrap' }}>{o.odgovor}</p>
<button
  onClick={() => {
    const utter = new SpeechSynthesisUtterance(o.odgovor);
    utter.lang = 'sr-RS';
    utter.rate = 1;
    speechSynthesis.speak(utter);
  }}
  style={{ marginTop: 8, padding: '4px 8px', background: '#0f0', color: '#000' }}
>
  Pusti glas
</button>
          </div>
        ))}
      </div>
    </div>
  );
}
