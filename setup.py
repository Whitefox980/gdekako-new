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
    "build": "next build && next export",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0"
  }
}
''',

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
}
''',

        ".env.local": "OPENAI_API_KEY=\nTAVILY_API_KEY=\n",

        "public/sounds/dial.mp3": "",  # upload manually
        "public/sounds/glitch.mp3": "",  # upload manually

        "public/images/operator_live.png": "",  # upload manually
        "public/images/ana.png": "",
        "public/images/ivana.png": "",
        "public/images/nemanja.png": "",
        "public/images/sanja.png": "",
        "public/images/teodora.png": "",
        "public/images/turizam.png": "",

        "styles/globals.css": '''
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: black;
  color: white;
  overflow-x: hidden;
}
.matrix {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url('/matrix-rain.gif'); /* ako koristiš animaciju */
  opacity: 0.3;
}
.fade-in {
  animation: fadeIn 2s ease-in-out forwards;
}
@keyframes fadeIn {
  0% { opacity: 0 }
  100% { opacity: 1 }
}
''',

        "data/agents.json": '''[
  { "id": "zdravstvo", "ime": "Ivana", "opis": "AI za zdravstvo", "slike": ["ivana.png"] },
  { "id": "obrazovanje", "ime": "Ana", "opis": "AI za obrazovanje", "slike": ["ana.png"] },
  { "id": "administracija", "ime": "Sanja", "opis": "AI za administraciju", "slike": ["sanja.png"] },
  { "id": "posao", "ime": "Nemanja", "opis": "AI za posao", "slike": ["nemanja.png"] },
  { "id": "turizam", "ime": "Turizam", "opis": "AI za turizam", "slike": ["turizam.png"] },
  { "id": "tehnologija", "ime": "Teodora", "opis": "AI za tehnologiju", "slike": ["teodora.png"] }
]''',

        "pages/index.tsx": '''
import { useEffect, useState } from 'react'
import Image from 'next/image'
import agents from '@/data/agents.json'

export default function Home() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = new Audio("/sounds/dial.mp3")
    audio.playbackRate = 1.8
    audio.play()
    setTimeout(() => setStarted(true), 3000)
  }, [])

  return (
    <div>
      {!started ? (
        <div className="fade-in" style={{ textAlign: "center", paddingTop: "20%", color: "#0f0" }}>
          <h2>Uspostavljanje veze sa Centralom...</h2>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 20 }}>
          <Image
            src="/images/operator_live.png"
            alt="Operater"
            width={300}
            height={300}
            style={{ borderRadius: "50%" }}
          />
          <h2 style={{ marginTop: 10, color: "#0f0" }}>-- Dobro Došli u Ai svet --<br/>Gde-kako.rs<br/>Odgovora na pitanja<br/>Specijalnih Ai Agenata</h2>
        </div>
      )}
    </div>
  )
}
'''
    }

    for path, content in files.items():
        if content.strip() != "":
            create_file(path, content)

if __name__ == "__main__":
    create_structure()
