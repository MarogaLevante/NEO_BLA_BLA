require("dotenv").config();
const express = require("express");
const { OpenAI } = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/chat", async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje) {
      return res.status(400).json({ error: "Falta el mensaje." });
    }

    const respuesta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: mensaje }]
    });

    const respuestaIA = respuesta.choices[0].message.content.trim();
    res.json({ respuesta: respuestaIA });

  } catch (error) {
    console.error("❌ Error en /chat:", error.message);
    res.status(500).json({ error: "Error al generar la respuesta." });
  }
});

module.exports = router;
// Este archivo define la ruta /api/chat para interactuar con OpenAI
// Recibe un mensaje del usuario y devuelve la respuesta generada por el modelo GPT-3