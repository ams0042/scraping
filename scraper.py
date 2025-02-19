import requests
from bs4 import BeautifulSoup
import csv
import json
import random
import feedparser

# URL de IMDb para obtener películas populares
URL = "https://www.imdb.com/chart/moviemeter/"
HEADERS = {"User-Agent": "Mozilla/5.0"}

# Realizar la solicitud HTTP
response = requests.get(URL, headers=HEADERS)
soup = BeautifulSoup(response.text, "html.parser")

# Extraer las películas (Asegurar que sean entre 30 y 40)
productos = []
peliculas = soup.select(".ipc-metadata-list-summary-item")

# Asegurar que haya al menos 30 películas y máximo 40
num_peliculas = max(30, min(len(peliculas), 40))
peliculas = peliculas[:num_peliculas]

for item in peliculas:
    titulo = item.select_one(".ipc-title__text").text.strip()
    calificacion = item.select_one(".ipc-rating-star--imdb").text.strip() if item.select_one(".ipc-rating-star--imdb") else "N/A"
    imagen = item.select_one("img")["src"] if item.select_one("img") else ""
    descripcion = "Una película imperdible con una historia cautivadora."  # Descripción genérica
    precio = f"{random.randint(5, 20)}.99€"  # Generar un precio aleatorio entre 5.99€ y 20.99€
    
    productos.append({"titulo": titulo, "calificacion": calificacion, "imagen": imagen, "descripcion": descripcion, "precio": precio})

# Guardar en CSV
csv_filename = "productos.csv"
with open(csv_filename, "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["titulo", "calificacion", "imagen", "descripcion", "precio"])
    writer.writeheader()
    writer.writerows(productos)

# Convertir CSV a JSON
def csv_a_json(csv_file, json_file):
    with open(csv_file, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        datos = list(reader)
    with open(json_file, "w", encoding="utf-8") as file:
        json.dump(datos, file, indent=4, ensure_ascii=False)

json_filename = "productos.json"
csv_a_json(csv_filename, json_filename)

# Obtener noticias de películas desde un RSS
RSS_FEED_URL = "https://www.hollywoodreporter.com/t/movies/feed/"
feed = feedparser.parse(RSS_FEED_URL)

noticias = []
for entry in feed.entries[:10]:  # Obtener las 10 últimas noticias
    noticias.append({
        "titulo": entry.title,
        "descripcion": entry.summary,
        "link": entry.link
    })

# Guardar noticias en JSON
noticias_filename = "noticias.json"
with open(noticias_filename, "w", encoding="utf-8") as file:
    json.dump(noticias, file, indent=4, ensure_ascii=False)

print(f"Noticias guardadas en {noticias_filename}")

# Obtener noticias desde un feed ATOM
ATOM_FEED_URL = "https://www.indiewire.com/c/film/feed/"
atom_feed = feedparser.parse(ATOM_FEED_URL)

noticias_atom = []
for entry in atom_feed.entries[:10]:  # Obtener las 10 últimas noticias
    noticias_atom.append({
        "titulo": entry.title,
        "descripcion": entry.summary,
        "link": entry.link
    })

# Guardar noticias ATOM en JSON
noticias_atom_filename = "noticias_atom.json"
with open(noticias_atom_filename, "w", encoding="utf-8") as file:
    json.dump(noticias_atom, file, indent=4, ensure_ascii=False)

print(f"Noticias ATOM guardadas en {noticias_atom_filename}")

print(f"Datos guardados en {csv_filename} y convertidos a {json_filename}")