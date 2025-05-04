import agents from '@/data/agents.json'

export function odrediAgenta(upit: string) {
  const lower = upit.toLowerCase()

  if (lower.includes('prav')) return pronadji('pravni')
  if (lower.includes('tur')) return pronadji('turistički')
  if (lower.includes('tehn')) return pronadji('tehnološki')
  if (lower.includes('zdrav')) return pronadji('zdravstveni')
  if (lower.includes('obraz') || lower.includes('škola')) return pronadji('obrazovni')
  if (lower.includes('admin')) return pronadji('administrativni')
  if (lower.includes('posao') || lower.includes('zaposlenje')) return pronadji('poslovni')

  return agents.find((a) => a.id === 'centralni') || agents[0]

  function pronadji(ključ: string) {
    return agents.find((a) => a.id.includes(ključ)) || agents[0]
  }
}
