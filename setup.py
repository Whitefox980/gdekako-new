import os
def create_file(path, content):
    dir_path = os.path.dirname(path)
    if dir_path:
        os.makedirs(dir_path, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def create_structure():
    files = {
        "package.json": """{
  "name": "gdekako-new",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.28",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "openai": "^4.19.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.28",
    "@types/node": "^18.0.0"
  }
}""",
        "tsconfig.json": """{
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
}""",
        ".gitignore": """node_modules
.next
out
.env.local
""",
        ".env.local": """OPENAI_API_KEY=sk-__YOUR_KEY_HERE__
""",
        "next.config.js": """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
}
module.exports = nextConfig
""",
    }

    for path, content in files.items():
        create_file(path, content)

if __name__ == "__main__":
    create_structure()
    print("Setup complete.")

