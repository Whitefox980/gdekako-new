import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import { readFileSync } from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pitanje } = req.body

  if (!pitanje) {
    return res.status(400).json({ error: 'Pitanje je obavezno.' })
  }

  // Učitaj agente
  const agentsPath = path.join(process.cwd(), 'data', 'agents.json')
  const agents = JSON.parse(readFileSync(agentsPath, 'utf-8'))

  const odgovori = []

  for (const agent of agents) {
    const prompt = `Ti si specijalizovani AI agent za oblast: ${agent.ime}.
    
Pitanje korisnika: ${pitanje}

Odgovori kratko i korisno u kontekstu tvoje oblasti.`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150
      })

      const text = completion.choices?.[0]?.message?.content?.trim()
      if (text) {
        odgovori.push({
          agentId: agent.id,
          ime: agent.ime,
          odgovor: text
        })
      }
    } catch (e) {
      console.error(`Greška za agenta ${agent.ime}:`, e)
    }
  }

  res.status(200).json({ odgovori })
}
