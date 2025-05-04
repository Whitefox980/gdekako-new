import os

def create_file(path, content):
    dir_name = os.path.dirname(path)
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def create_structure():
    files = {
        "package.json": '''{
  "name": "gdekako-new",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "openai": "^4.97.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15"
  }
}''',

        "tsconfig.json": '''{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}''',

        "next.config.js": '''/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true
  }
};
module.exports = nextConfig;
''',

        ".gitignore": '''node_modules
.next
out
.env.local
''',

        ".env.local": '''OPENAI_API_KEY=your_openai_key_here
''',

        "types/json.d.ts": '''declare module "*.json" {
  const value: any;
  export default value;
}''',

        "types/agents.ts": '''export interface Agent {
  id: string;
  ime: string;
  opis: string;
  slike: string[];
}''',

        "data/agents.json": '''[
  {
    "id": "pravni",
    "ime": "Marko Pravni",
    "opis": "Pruža odgovore na pravna pitanja.",
    "slike": ["/marko.png"]
  }
]''',

        "public/marko.png": "",

        "styles/globals.css": '''body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}''',

        "pages/index.tsx": '''import agents from '@/data/agents.json';
import Image from 'next/image';

export default function Home() {
  return (
    <main style={{ padding: 30 }}>
      <h1>Gde-Kako.rs</h1>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {agents.map((agent) => (
          <div key={agent.id} style={{ width: 250, border: '1px solid #ccc', borderRadius: 10, padding: 10 }}>
            <Image src={agent.slike[0]} alt={agent.ime} width={200} height={200} />
            <h3>{agent.ime}</h3>
            <p>{agent.opis}</p>
          </div>
        ))}
      </div>
    </main>
  );
}''',

        "pages/api/pravni.ts": '''import type { NextApiRequest, NextApiResponse } from 'next';
import type { Agent } from '@/types/agents';
import agents from '@/data/agents.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Agent | { error: string }>
) {
  const agent = agents.find((a) => a.id === 'pravni');
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.status(200).json(agent);
}''',

        "pages/api/ask.ts": '''import type { NextApiRequest, NextApiResponse } from 'next';
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
}'''
    }

    for path, content in files.items():
        create_file(path, content)

if __name__ == "__main__":
    create_structure()
