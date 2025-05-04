export default function AgentCard({ name, description }) {
  return (
    <div className="agent-card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}
