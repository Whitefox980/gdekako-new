// agents/centralAgent.ts
import agents from '@/data/agents.json'

type Agent = {
  id: string
  ime: string
  opis: string
  slike: string[]
}

export function getRelevantAgent(question: string): Agent {
  const lower = question.toLowerCase()

  if (lower.includes('zdravstvo')) return pronadji('zdravstvo')
  if (lower.includes('obrazovanje')) return pronadji('obrazovanje')
  if (lower.includes('administracija')) return pronadji('administracija')
  if (lower.includes('posao')) return pronadji('posao')
  if (lower.includes('turizam')) return pronadji('turizam')
  if (lower.includes('tehnologija')) return pronadji('tehnologija')

  return agents.find((a: Agent) => a.id === 'centralni') || agents[0]

  function pronadji(ključ: string): Agent {
    return agents.find((a: Agent) => a.id.includes(ključ)) || agents[0]
  }
}
