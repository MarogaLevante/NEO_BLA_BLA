# 🔌 NEO_BLA_BLA Backend (Chat IA)

Este servidor actúa como proxy seguro hacia OpenAI para proteger tu clave de API.

## ▶️ ¿Cómo ejecutarlo?

```bash
cd backend
npm install express cors node-fetch dotenv
node server.js
```

## 📄 Archivo `.env`

Crea un archivo `.env` y coloca tu clave así:

```
OPENAI_API_KEY=sk-tu-clave-real
```

Verifica que tengas conexión a internet y clave activa en: https://platform.openai.com/account/api-keys
