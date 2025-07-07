const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const reservaRoutes = require("./reservas");
const usuarioRoutes = require("./usuarios");
const chatRoutes = require("./chat"); // ✅ Chat aquí

// ✅ Agrupa todas las rutas bajo /api
router.use("/auth", authRoutes);
router.use("/reservas", reservaRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/chat", chatRoutes);

module.exports = router;
// Aquí se organizan todas las rutas de la API bajo un solo prefijo /api
// Esto permite una estructura más limpia y fácil de mantener.  