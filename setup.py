from pathlib import Path

# Osnovni direktorijumi
dirs = [
    "pages/api",
    "components",
    "public/images",
    "styles",
    "data"
]

# Fajlovi sa sadržajem
files = {
    "pages/index.tsx": """\
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gde-Kako.rs</title>
      </Head>
      <main>
        <h1>Dobrodošli na Gde-Kako.rs</h1>
        <p>Pronađi odgovore brzo, precizno i sa AI agentima!</p>
      </main>
    </>
  );
}
""",

    "pages/api/hello.ts": """\
export default function handler(req, res) {
  res.status(200).json({ message: "Hello from API!" });
}
""",

    "components/AgentCard.tsx": """\
export default function AgentCard({ ime, opis }: { ime: string, opis: string }) {
  return (
    <div className="agent-card">
      <h3>{ime}</h3>
      <p>{opis}</p>
    </div>
  );
}
""",

    "styles/globals.css": """\
body {
  font-family: sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 2rem;
}
""",

    "data/agents.json": open("data/agents.json", "r").read(),

    ".env.local": """\
OPENAI_API_KEY=your-openai-key-here
TAVILY_API_KEY=your-tavily-key-here
"""
}

# Kreiraj direktorijume
for d in dirs:
    Path(d).mkdir(parents=True, exist_ok=True)

# Upis fajlova
for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("Setup complete!")
