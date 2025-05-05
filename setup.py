import os

def create_file(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write('')

def create_structure():
    create_file('gdekako-ui/public/images/ana.png')
    create_file('gdekako-ui/public/images/ivana.png')
    create_file('gdekako-ui/public/images/sanja.png')
    create_file('gdekako-ui/public/images/teodora.png')
    create_file('gdekako-ui/public/images/nemanja.png')
    create_file('gdekako-ui/public/images/operator_live.png')
    create_file('gdekako-ui/public/images/turizam.png')
    create_file('gdekako-ui/public/images/lisica.png')
    create_file('gdekako-ui/public/sounds/dial.mp3')
    create_file('gdekako-ui/public/sounds/glitch.wav')
    create_file('gdekako-ui/public/backgrounds/matrix-bg.jpg')
    create_file('gdekako-ui/styles/globals.css')
    create_file('gdekako-ui/pages/index.tsx')
    create_file('gdekako-ui/pages/agent.tsx')
    create_file('gdekako-ui/components/Chat.tsx')
    create_file('gdekako-ui/components/AgentBubble.tsx')
    create_file('gdekako-ui/components/AgentCard.tsx')
    create_file('gdekako-ui/data/agents.json')
    create_file('gdekako-ui/utils/relevance.ts')

if __name__ == '__main__':
    create_structure()
