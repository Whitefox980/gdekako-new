import os

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def create_structure():
    files = [
        ("data/agents.json", '''[
  {
    "id": "pravni",
    "ime": "Marko Pravni",
    "opis": "Pruža odgovore iz oblasti prava i administracije.",
    "slike": ["/images/agent_pravni.png"]
  },
  {
    "id": "turisticki",
    "ime": "Jelena Turistički",
    "opis": "Saveti o putovanjima, destinacijama i letovanjima.",
    "slike": ["/images/agent_turisticki.png"]
  },
  {
    "id": "tehnoloski",
    "ime": "Teodora Tehnološka",
    "opis": "Pomaže oko uređaja, aplikacija i digitalnog sveta.",
    "slike": ["/images/agent_tehnoloski.png"]
  },
  {
    "id": "zdravstvo",
    "ime": "Dr Ana Zdravlje",
    "opis": "Daje informacije o lekovima, lekarima i zdravstvenim uslugama.",
    "slike": ["/images/agent_zdravstvo.png"]
  },
  {
    "id": "obrazovanje",
    "ime": "Učiteljica Mina",
    "opis": "Vodi vas kroz školovanje, kurseve i studije.",
    "slike": ["/images/agent_obrazovanje.png"]
  },
  {
    "id": "posao",
    "ime": "Ivan Poslovni",
    "opis": "Pretraga oglasa za posao, priprema CV-ja i saveti.",
    "slike": ["/images/agent_posao.png"]
  },
  {
    "id": "administracija",
    "ime": "Sanja Šalter",
    "opis": "Rešava dileme oko dokumenata, prijava i državnih službi.",
    "slike": ["/images/agent_admin.png"]
  }
]''')
    ]

    for path, content in files:
        create_file(path, content)

if __name__ == "__main__":
    create_structure()
