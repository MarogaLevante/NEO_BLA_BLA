const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verificarAdmin } = require("../utils/authMiddleware");

router.get("/usuarios", verificarAdmin, async (req, res) => {
  const usuarios = await User.find();
  res.json(usuarios);
});

module.exports = router;