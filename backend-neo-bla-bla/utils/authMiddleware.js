const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ mensaje: "❌ Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    return res.status(401).json({ mensaje: "❌ Token inválido" });
  }
}

function verificarAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ mensaje: "⛔ Acceso denegado (solo admin)" });
  }
  next();
}

module.exports = { verificarToken, verificarAdmin };
