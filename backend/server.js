
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta para guardar reservas
app.post("/api/reservar", (req, res) => {
  const nuevaReserva = req.body;

  const filePath = path.join(__dirname, "reservas.json");

  let reservasActuales = [];
  if (fs.existsSync(filePath)) {
    try {
      reservasActuales = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (err) {
      return res.status(500).json({ mensaje: "Error al leer reservas existentes." });
    }
  }

  reservasActuales.push(nuevaReserva);

  try {
    fs.writeFileSync(filePath, JSON.stringify(reservasActuales, null, 2));
    res.status(200).json({ mensaje: "✅ Reserva guardada con éxito" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al guardar la reserva." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
app.get("/api/reservas", (req, res) => {
  const filePath = path.join(__dirname, "reservas.json");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(200).json([]);
  }
});
app.delete("/api/reservas/:index", (req, res) => {
  const filePath = path.join(__dirname, "reservas.json");
  const reservas = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : [];

  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= reservas.length) {
    return res.status(400).json({ mensaje: "Índice inválido." });
  }

  reservas.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(reservas, null, 2));
  res.status(200).json({ mensaje: "✅ Reserva eliminada correctamente." });
});
