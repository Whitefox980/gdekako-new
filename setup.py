
from setuptools import setup
import os

def create_file(path, content=""):
    if os.path.dirname(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)

project_files = {
    "public/images/operator.png": "",
    "public/images/ivana.png": "",
    "public/images/ana.png": "",
    "public/images/sanja.png": "",
    "public/images/mila.png": "",
    "public/images/teodora.png": "",
    "public/images/lisica.png": "",
    "public/sounds/dial.mp3": "",
    "public/sounds/glitch.wav": "",
    "styles/globals.css": "body { background: black; color: white; font-family: sans-serif; }",
    "pages/index.tsx": "// React index page with layout (to be filled in)",
    "next.config.js": "module.exports = { output: 'export' }",
    "package.json": "{\n  \"scripts\": { \"dev\": \"next dev\", \"build\": \"next build\", \"start\": \"next start\" }\n}",
    "tsconfig.json": "{\n  \"compilerOptions\": { \"jsx\": \"preserve\", \"esModuleInterop\": true }\n}"
}

def create_structure():
    for path, content in project_files.items():
        create_file(path, content)

if __name__ == "__main__":
    create_structure()

