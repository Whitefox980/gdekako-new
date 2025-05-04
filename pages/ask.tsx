import { useEffect, useState } from 'react';

type Agent = {
  id: string;
  ime: string;
  domen: string;
  boja: string;
  avatar: string;
  opis: string;
  prompt_stil: string;
};

export default function AskPage() {
  const [agenti, setAgenti] = useState<Agent[]>([]);
  const [pitanje, setPitanje] = useState('');
  const [odgovor, setOdgovor] = useState('');
  const [izabrani, setIzabrani] = useState<Agent | null>(null);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => setAgenti(data));
  }, []);

const handleSubmit = async () => {
  if (!izabrani || !pitanje) return;
  setOdgovor('Generišem odgovor...');

  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pitanje, agentId: izabrani.id }),
  });

  const data = await res.json();
  setOdgovor(data.odgovor || 'Greška u odgovoru.');
};
  return (
    <div style={{ padding: 32 }}>
      <h1>Postavi pitanje agentu</h1>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {agenti.map(agent => (
          <div key={agent.id}
               style={{
                 border: izabrani?.id === agent.id ? '3px solid black' : '1px solid gray',
                 borderRadius: 10,
                 padding: 10,
                 background: agent.boja,
                 color: 'white',
                 cursor: 'pointer',
                 width: 200
               }}
               onClick={() => setIzabrani(agent)}>
            <h3>{agent.ime}</h3>
            <img src={`/avatars/${agent.avatar}`} alt={agent.ime} style={{ width: '100%', borderRadius: 8 }} />
          </div>
        ))}
      </div>

      {izabrani && (
        <div style={{ marginTop: 32 }}>
          <h2>Pitanje za {izabrani.ime}:</h2>
          <textarea
            value={pitanje}
            onChange={e => setPitanje(e.target.value)}
            rows={4}
            style={{ width: '100%', padding: 8 }}
            placeholder="Unesi svoje pitanje..."
          />
          <button onClick={handleSubmit} style={{ marginTop: 12, padding: '8px 16px' }}>
            Pošalji
          </button>
        </div>
      )}

      {odgovor && (
        <div style={{ marginTop: 24, background: '#eee', padding: 16, borderRadius: 8 }}>
          <strong>Odgovor:</strong>
          <p>{odgovor}</p>
        </div>
      )}
    </div>
  );
}
