
interface AgentProps {
  agent: {
    name: string;
    title: string;
    image: string;
    description: string;
  };
}

export default function AgentCard({ agent }: AgentProps) {
  return (
    <div style={{
      backgroundColor: '#000',
      color: '#0f0',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 0 15px #0f0',
      textAlign: 'center',
    }}>
      <img src={agent.image} alt={agent.name} style={{ width: '100%', borderRadius: '8px' }} />
      <h2>{agent.name}</h2>
      <h3>{agent.title}</h3>
      <p>{agent.description}</p>
    </div>
  );
}
