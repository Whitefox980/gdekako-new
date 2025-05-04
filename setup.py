
import os
def create_file(path, content=""):
    dir_name = os.path.dirname(path)
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def create_structure():
    files = {
        "next.config.js": """
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
""",
        "netlify.toml": """
[build]
  command = "npm run build"
  publish = "out"
"""
    }

    for path, content in files.items():
        create_file(path, content)

if __name__ == "__main__":
    create_structure()

