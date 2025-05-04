import agents from '@/data/agents.json';
import Image from 'next/image';

export default function Home() {
  return (
    <main style={{ padding: 30 }}>
      <h1>Gde-Kako.rs</h1>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {agents.map((agent) => (
          <div key={agent.id} style={{ width: 250, border: '1px solid #ccc', borderRadius: 10, padding: 10 }}>
            <Image src={agent.slike[0]} alt={agent.ime} width={200} height={200} />
            <h3>{agent.ime}</h3>
            <p>{agent.opis}</p>
          </div>
        ))}
      </div>
    </main>
  );
}