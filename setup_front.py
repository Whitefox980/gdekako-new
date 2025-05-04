import os

project_dir = "gdekako-agenti"

# 1. Kreiraj index.tsx (frontend stranicu)
index_code = """\
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

export default function Home() {
  const [agenti, setAgenti] = useState<Agent[]>([]);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => setAgenti(data));
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Gde-Kako.rs - Agenti</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
        {agenti.map(agent => (
          <div key={agent.id} style={{ borderRadius: 12, background: agent.boja, padding: 16, color: 'white' }}>
            <h2>{agent.ime}</h2>
            <img src={`/avatars/${agent.avatar}`} alt={agent.ime} style={{ width: '100%', borderRadius: 8 }} />
            <p>{agent.opis}</p>
            <small><i>{agent.prompt_stil}</i></small>
          </div>
        ))}
      </div>
    </div>
  );
}
"""

os.makedirs(f"{project_dir}/pages", exist_ok=True)
with open(f"{project_dir}/pages/index.tsx", "w") as f:
    f.write(index_code)

# 2. Kreiraj avatars folder i README
public_dir = f"{project_dir}/public/avatars"
os.makedirs(public_dir, exist_ok=True)
with open(f"{public_dir}/README.txt", "w") as f:
    f.write("Ovde ubaciti slike agenata: zora.png, teodora.png, marko.png, jelena.png, dara.png, vuk.png, mina.png")

print("Frontend index.tsx i avatars/README su uspešno kreirani.")
