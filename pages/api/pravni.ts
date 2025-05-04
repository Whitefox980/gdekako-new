import type { NextApiRequest, NextApiResponse } from 'next';
import type { Agent } from '@/types/agents';
import agents from '@/data/agents.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Agent | { error: string }>
) {
  const agent = agents.find((a) => a.id === 'pravni');
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.status(200).json(agent);
}