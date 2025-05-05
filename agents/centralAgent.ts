import agents from '@/data/agents.json'

export default function centralAgent(input: string) {
  const lower = input.toLowerCase()

  if (lower.includes('pravni') || lower.includes('zakon')) return pronadji('pravni')
  if (lower.includes('turizam') || lower.includes('letovanje')) return pronadji('turistički')
  if (lower.includes('tehnologija') || lower.includes('ai')) return pronadji('tehnološka')
  if (lower.includes('zdravstvo') || lower.includes('lekar')) return pronadji('zdravstveni')
  if (lower.includes('administracija') || lower.includes('dokument')) return pronadji('administrativni')
  if (lower.includes('škola') || lower.includes('učitelj')) return pronadji('obrazovni')
  if (lower.includes('posao') || lower.includes('zaposlenje')) return pronadji('poslovni')

  return agents.find((a: { id: string }) => a.id === 'centralni') || agents[0]

  function pronadji(ključ: string) {
    return agents.find((a: { id: string }) => a.id.includes(ključ)) || agents[0]
  }
}
