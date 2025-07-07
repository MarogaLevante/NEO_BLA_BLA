const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const nuevoUsuario = new User({ nombre, email, password: hashed });
    await nuevoUsuario.save();
    res.json({ mensaje: "✅ Usuario registrado." });
  } catch (err) {
    res.status(500).json({ error: "❌ Error en el registro." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await User.findOne({ email });
  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ error: "❌ Credenciales incorrectas" });
  }

  const token = jwt.sign({ id: usuario._id, email: usuario.email, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ mensaje: "✅ Login exitoso", token });
});

module.exports = router;