const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public")); // Sirve archivos estáticos (HTML, CSS, JS)

// Ruta para obtener los productos desde productos.json
app.get("/productos", (req, res) => {
    fs.readFile("productos.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error al leer el archivo JSON" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Ruta para obtener noticias RSS desde noticias.json
app.get("/noticias", (req, res) => {
    fs.readFile("noticias.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error al leer el archivo JSON de noticias" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Ruta para obtener noticias ATOM desde noticias_atom.json
app.get("/noticias-atom", (req, res) => {
    fs.readFile("noticias_atom.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error al leer el archivo JSON de noticias ATOM" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});