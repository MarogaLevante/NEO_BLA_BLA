import React, { useState } from "react";

export default function Chat() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const nuevoMensajeUsuario = { rol: "user", contenido: mensaje };
    setMensajes([...mensajes, nuevoMensajeUsuario]);
    setMensaje("");
    setCargando(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje }),
      });

      const data = await res.json();
      if (res.ok) {
        const nuevoMensajeIA = { rol: "ia", contenido: data.respuesta };
        setMensajes((prev) => [...prev, nuevoMensajeIA]);
      } else {
        const errorMsg = data.error || "Error inesperado del servidor.";
        setMensajes((prev) => [...prev, { rol: "error", contenido: errorMsg }]);
      }
    } catch (err) {
      setMensajes((prev) => [...prev, { rol: "error", contenido: "❌ No se pudo conectar al servidor." }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">💬 Chat con IA</h2>

      <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded mb-4">
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              m.rol === "user"
                ? "bg-blue-100 text-right"
                : m.rol === "ia"
                ? "bg-green-100 text-left"
                : "bg-red-100 text-left text-red-700"
            }`}
          >
            {m.contenido}
          </div>
        ))}
        {cargando && <div className="text-gray-500">⏳ Pensando...</div>}
      </div>

      <form onSubmit={enviarMensaje} className="flex gap-2">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={cargando}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
