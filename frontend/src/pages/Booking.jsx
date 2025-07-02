
import React, { useState } from "react";

export default function Booking() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [idioma, setIdioma] = useState("Español");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const enviarFormulario = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, idioma, fecha, hora })
      });

      const data = await response.json();
      alert(data.mensaje);
      setNombre("");
      setEmail("");
      setIdioma("Español");
      setFecha("");
      setHora("");
    } catch (error) {
      alert("❌ Error al enviar la reserva.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">🗓️ Reserva tu clase de idioma</h2>
      <form onSubmit={enviarFormulario} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <select
          value={idioma}
          onChange={(e) => setIdioma(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Español</option>
          <option>Francés</option>
          <option>Árabe</option>
        </select>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Reservar sesión
        </button>
      </form>
    </div>
  );
}
