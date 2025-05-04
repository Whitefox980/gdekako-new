import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Samo POST dozvoljen' });
  }

  const { pitanje } = req.body;
  if (!pitanje) return res.status(400).json({ error: 'Pitanje je obavezno.' });

  const agentsPath = path.join(process.cwd(), 'gdekako-agenti/data/agents.json');
  const agents = JSON.parse(fs.readFileSync(agentsPath, 'utf8'));

  const odgovori = [];

  for (const agent of agents) {
    const prompt = `${agent.prompt_stil}

Pitanje: ${pitanje}
Odgovor:`;
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 120,
      temperature: 0.8,
    });

    const tekst = completion.data.choices[0].text?.trim();
    odgovori.push({ agentId: agent.id, ime: agent.ime, odgovor: tekst });
  }

  res.status(200).json({ odgovori });
}
