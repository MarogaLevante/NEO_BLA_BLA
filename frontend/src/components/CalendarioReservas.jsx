import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function CalendarioReservas() {
  const [reservas, setReservas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [detalle, setDetalle] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/mis-reservas", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setReservas(data);
      } catch (err) {
        console.error("❌ Error al cargar reservas:", err);
      }
    };

    fetchReservas();
  }, [token]);

  const fechasReservadas = reservas.map(r => new Date(r.fecha));

  const mostrarDetalle = (date) => {
    setFechaSeleccionada(date);
    const reserva = reservas.find(r => new Date(r.fecha).toDateString() === date.toDateString());
    setDetalle(reserva || null);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && fechasReservadas.some(d => d.toDateString() === date.toDateString())) {
      return 'bg-blue-200 text-black rounded font-semibold';
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-2">📅 Calendario de tus reservas</h3>
      <Calendar onClickDay={mostrarDetalle} tileClassName={tileClassName} />

      {detalle && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h4 className="text-lg font-semibold">📌 Detalles de la reserva</h4>
          <p><strong>Idioma:</strong> {detalle.idioma}</p>
          <p><strong>Fecha:</strong> {detalle.fecha}</p>
          <p><strong>Hora:</strong> {detalle.hora}</p>
          <p><strong>Zoom:</strong> <a href={`https://zoom.us/my/neo-${detalle.email.split("@")[0]}`} className="text-blue-600 underline" target="_blank" rel="noreferrer">Enlace</a></p>
        </div>
      )}
    </div>
  );
}
