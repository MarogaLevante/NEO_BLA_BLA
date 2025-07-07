import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Chat from "./pages/Chat";
import Booking from "./pages/Booking";
import LessonsTab from "./pages/LessonsTab";
import LessonViewer from "./pages/LessonViewer";
import AdminReservas from "./pages/AdminReservas";
import Lessons from "./pages/Lessons";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PerfilUsuario from "./pages/PerfilUsuario";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Navbar /> {/* Aquí va el nuevo menú superior SPA */}

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/lecciones" element={<Lessons />} />
          <Route path="/lecciones-avanzadas" element={<LessonsTab />} />
          <Route path="/reserva" element={<Booking />} />
          <Route path="/admin-reservas" element={<AdminReservas />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
        </Routes>
      </main>
    </div>
  );
}
