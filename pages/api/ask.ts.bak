import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pitanje } = req.body;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: pitanje }],
  });

  const odgovor = completion.choices[0].message?.content?.trim();

  const logPath = path.join(process.cwd(), 'gdekako-agenti/logs/questions.json');
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf8')) : [];
  logs.push({ pitanje, odgovor, timestamp: Date.now() });
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

  res.status(200).json({ odgovor });
}