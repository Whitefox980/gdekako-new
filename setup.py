import os

# Root folder
root = "gdekako-new"

# Struktura foldera i fajlova
structure = {
    "data": {
        "agents.json": """[
  {
    "name": "Marko Pravni",
    "avatar": "/public/marko.png",
    "description": "Vaš AI savetnik za pravne dileme u Srbiji."
  }
]"""
    },
    "pages": {
        "index.tsx": """import React from "react";

export default function Home() {
  return (
    <div>
      <h1>Dobrodošli na gde-kako.rs</h1>
      <p>Pronađite odgovore na gde i kako pitanja, uz pomoć AI agenata.</p>
    </div>
  );
}
"""
    },
    "pages/api": {
        "pravni.ts": """import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.body;
  // Simulacija AI odgovora
  res.status(200).json({ answer: `Pravno gledano, evo odgovora na: ${question}` });
}
"""
    },
    "public": {
        "marko.png": ""  # Samo prazno mesto za sad, ti dodaš sliku
    },
    "components": {
        "AgentCard.tsx": """import React from "react";

export default function AgentCard({ name, avatar, description }) {
  return (
    <div>
      <img src={avatar} alt={name} width="100" />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}
"""
    },
    "styles": {
        "globals.css": """body {
  font-family: sans-serif;
  background-color: #000;
  color: #0f0;
}
"""
    },
    ".": {
        ".env.local": "TAVILY_API_KEY=your-tavily-key\nOPENAI_API_KEY=your-openai-key"
    }
}

# Funkcija za kreiranje strukture
def create_structure(base, struct):
    for name, content in struct.items():
        path = os.path.join(base, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)

if __name__ == "__main__":
    if not os.path.exists(root):
        os.mkdir(root)
    create_structure(root, structure)
    print(f"Struktura '{root}' je uspešno kreirana.")
