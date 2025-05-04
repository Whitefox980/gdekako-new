export default function AgentCard({ ime, opis }: { ime: string, opis: string }) {
  return (
    <div className="agent-card">
      <h3>{ime}</h3>
      <p>{opis}</p>
    </div>
  );
}
