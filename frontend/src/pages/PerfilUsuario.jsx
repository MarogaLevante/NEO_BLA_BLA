import React, { useState, useEffect } from "react";
import CalendarioReservas from "../components/CalendarioReservas";

export default function PerfilUsuario() {
  const [tab, setTab] = useState("progreso");
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReservas();
  }, [token]);

  const fetchReservas = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/mis-reservas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReservas(data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    }
  };

  const cancelarReserva = async (id) => {
    if (!window.confirm("¿Seguro que quieres cancelar esta reserva?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/cancelar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      alert(data.mensaje);
      // Refrescar lista
      setReservas((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("❌ Error al cancelar");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">👤 Panel de Usuario</h2>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
          Cerrar sesión
        </button>
      </div>

      <div className="flex space-x-4 border-b pb-2 mb-6">
        <button onClick={() => setTab("progreso")} className={`${tab === "progreso" ? "text-blue-600 font-bold" : "text-gray-600"}`}>📈 Progreso</button>
        <button onClick={() => setTab("reservas")} className={`${tab === "reservas" ? "text-blue-600 font-bold" : "text-gray-600"}`}>📋 Reservas</button>
        <button onClick={() => setTab("calendario")} className={`${tab === "calendario" ? "text-blue-600 font-bold" : "text-gray-600"}`}>📅 Calendario</button>
      </div>

      {tab === "progreso" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">🧠 Tu progreso</h3>
          <p>Lecciones completadas: <strong>5</strong> / 20</p>
          <div className="w-full bg-gray-300 rounded h-4 mt-2">
            <div className="bg-green-500 h-4 rounded" style={{ width: "25%" }}></div>
          </div>
        </div>
      )}

      {tab === "reservas" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">📋 Tus reservas</h3>
          {reservas.length === 0 ? (
            <p>No tienes reservas registradas.</p>
          ) : (
            <ul className="space-y-2">
              {reservas.map((r, idx) => (
                <li key={idx} className="border p-3 rounded shadow-sm">
                  <p><strong>Idioma:</strong> {r.idioma}</p>
                  <p><strong>Fecha:</strong> {r.fecha} a las {r.hora}</p>
                  <p>
                    <strong>Zoom:</strong>{" "}
                    <a
                      href={`https://zoom.us/my/neo-${r.email.split("@")[0]}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Entrar a la sesión
                    </a>
                  </p>
                  <button
                    onClick={() => cancelarReserva(r._id)}
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancelar reserva
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "calendario" && (
        <CalendarioReservas />
      )}
    </div>
  );
}
