import type { NextApiRequest, NextApiResponse } from 'next';
import type { Agent } from '@/types/agents';
import agents from '@/data/agents.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Agent[]>
) {
  res.status(200).json(agents);
}