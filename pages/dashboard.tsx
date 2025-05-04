import fs from 'fs';
import path from 'path';

type LogEntry = {
  pitanje: string;
  agentId: string;
  vreme: string;
};

export async function getStaticProps() {
  // umesto getServerSideProps
}
export default function Dashboard({ logs }: { logs: LogEntry[] }) {
  return (
    <div style={{ padding: 32 }}>
      <h1>Dashboard – Poslednja pitanja</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid gray' }}>Vreme</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid gray' }}>Agent</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid gray' }}>Pitanje</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td style={{ padding: '8px 4px' }}>{new Date(log.vreme).toLocaleString()}</td>
              <td style={{ padding: '8px 4px' }}>{log.agentId}</td>
              <td style={{ padding: '8px 4px' }}>{log.pitanje}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
