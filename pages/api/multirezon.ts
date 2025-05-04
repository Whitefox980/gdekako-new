import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { agents } from '@/data/agents.json'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pitanje } = req.body
  if (!pitanje) return res.status(400).json({ error: 'Nedostaje pitanje.' })

  const odgovori = []
  for (const agent of agents) {
    const prompt = `${agent.opis}\nPitanje: ${pitanje}\nOdgovor:`
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 120,
    })
    const tekst = completion.choices[0].message.content?.trim()
    odgovori.push({ agentId: agent.id, ime: agent.ime, odgovor: tekst })
  }

  const logPath = path.join(process.cwd(), 'gdekako-agenti/logs/multirezon.json')
  fs.writeFileSync(logPath, JSON.stringify({ pitanje, odgovori }, null, 2))

  res.status(200).json({ odgovori })
}
