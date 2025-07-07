const express = require("express");
const router = express.Router();
const Reserva = require("../models/Reserva");
const { verificarToken } = require("../utils/authMiddleware");

// 📅 Crear nueva reserva (pública)
router.post("/reservar", async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.json({ mensaje: "✅ Reserva realizada con éxito." });
  } catch (error) {
    console.error("❌ Error al guardar reserva:", error);
    res.status(500).json({ mensaje: "❌ Error al guardar la reserva." });
  }
});

// 👤 Obtener reservas del usuario autenticado
router.get("/mis-reservas", verificarToken, async (req, res) => {
  try {
    const reservas = await Reserva.find({ email: req.user.email }); // El middleware debe añadir `req.user.email`
    res.json(reservas);
  } catch (error) {
    console.error("❌ Error al obtener reservas del usuario:", error);
    res.status(500).json({ mensaje: "Error al obtener reservas" });
  }
});

// ❌ Cancelar una reserva (si pertenece al usuario)
router.delete("/cancelar/:id", verificarToken, async (req, res) => {
  try {
    const resultado = await Reserva.findOneAndDelete({
      _id: req.params.id,
      email: req.user.email
    });
    if (!resultado) {
      return res.status(404).json({ mensaje: "Reserva no encontrada o no autorizada" });
    }
    res.json({ mensaje: "✅ Reserva cancelada correctamente" });
  } catch (err) {
    console.error("❌ Error al cancelar reserva:", err);
    res.status(500).json({ mensaje: "❌ Error al cancelar reserva" });
  }
});

module.exports = router;
