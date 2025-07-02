
import React, { useEffect, useState } from "react";

export default function AdminReservas() {
  const [reservas, setReservas] = useState([]);
  const [filtroIdioma, setFiltroIdioma] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = () => {
    fetch("http://localhost:3001/api/reservas")
      .then((res) => res.json())
      .then((data) => setReservas(data))
      .catch((err) => setError("No se pudieron cargar las reservas."));
  };

  const exportarCSV = () => {
    if (reservas.length === 0) return;
    const headers = Object.keys(reservas[0]).join(",");
    const rows = reservas.map(r => Object.values(r).join(",")).join("\n");
    const csvContent = headers + "\n" + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reservas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const eliminarReserva = (index) => {
    fetch("http://localhost:3001/api/reservas/" + index, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        alert(data.mensaje);
        fetchReservas();
      })
      .catch(() => alert("❌ Error al eliminar la reserva"));
  };

  const reservasFiltradas = reservas.filter((r) => {
    const coincideIdioma = filtroIdioma ? r.idioma === filtroIdioma : true;
    const coincideBusqueda =
      r.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.email.toLowerCase().includes(busqueda.toLowerCase());
    return coincideIdioma && coincideBusqueda;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">📋 Lista de Reservas</h2>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={filtroIdioma}
              onChange={(e) => setFiltroIdioma(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Todos los idiomas</option>
              <option value="Español">Español</option>
              <option value="Francés">Francés</option>
              <option value="Árabe">Árabe</option>
            </select>

            <input
              type="text"
              placeholder="Buscar por nombre o email"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="p-2 border rounded flex-grow"
            />

            <button
              onClick={exportarCSV}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Exportar a CSV
            </button>
          </div>

          {reservasFiltradas.length === 0 ? (
            <p className="text-gray-600">No hay reservas que coincidan con los filtros.</p>
          ) : (
            <table className="w-full table-auto border border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">Nombre</th>
                  <th className="border px-3 py-2">Email</th>
                  <th className="border px-3 py-2">Idioma</th>
                  <th className="border px-3 py-2">Fecha</th>
                  <th className="border px-3 py-2">Hora</th>
                  <th className="border px-3 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservasFiltradas.map((reserva, index) => (
                  <tr key={index} className="text-center">
                    <td className="border px-3 py-2">{reserva.nombre}</td>
                    <td className="border px-3 py-2">{reserva.email}</td>
                    <td className="border px-3 py-2">{reserva.idioma}</td>
                    <td className="border px-3 py-2">{reserva.fecha}</td>
                    <td className="border px-3 py-2">{reserva.hora}</td>
                    <td className="border px-3 py-2">
                      <button
                        onClick={() => eliminarReserva(index)}
                        className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
