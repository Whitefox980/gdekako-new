import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.body;
  // Simulacija AI odgovora
  res.status(200).json({ answer: `Pravno gledano, evo odgovora na: ${question}` });
}
