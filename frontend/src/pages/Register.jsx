
// src/pages/Register.jsx
import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.mensaje || "Registro completo");
    } catch (error) {
      alert("❌ Error al registrar usuario");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">📝 Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" placeholder="Contraseña" type="password" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Registrarse</button>
      </form>
    </div>
  );
}
