import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Samo POST zahtevi su dozvoljeni.' });
  }

  const { pitanje, agentId } = req.body;
  if (!pitanje || !agentId) {
    return res.status(400).json({ error: 'Nedostaje pitanje ili agentId.' });
  }

  // Učitaj agenta
  const agentsPath = path.join(process.cwd(), 'gdekako-agenti/data/agents.json');
  const agents = JSON.parse(fs.readFileSync(agentsPath, 'utf8'));
  const agent = agents.find((a: any) => a.id === agentId);
  if (!agent) return res.status(404).json({ error: 'Nepoznat agent.' });

  // Prompt
  const prompt = `${agent.prompt_stil}\n\nPitanje: ${pitanje}\nOdgovor:`;

  // AI poziv
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 150,
    temperature: 0.8,
  });

  const odgovor = completion.data.choices[0].text?.trim();

  // Loguj
  const logPath = path.join(process.cwd(), 'gdekako-agenti/logs/questions.json');
  const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf8')) : [];
  logs.push({ pitanje, agentId, vreme: new Date().toISOString(), odgovor });
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

  return res.status(200).json({ odgovor });
}
