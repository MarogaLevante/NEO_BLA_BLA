import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes, FaMoon, FaSun, FaUser, FaTools } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const buttonClass =
    "bg-white text-blue-700 hover:bg-yellow-300 hover:text-blue-900 font-semibold px-3 py-1 rounded-xl transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600";

  return (
    <nav className="bg-blue-700 dark:bg-gray-900 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl hover:text-yellow-300">
          🌍 Alif y Olé
        </Link>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-xl hover:text-yellow-300"
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Hamburguesa móvil */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Botones principales (solo escritorio) */}
        <div className="hidden md:flex flex-wrap items-center gap-3">
          <Link to="/lecciones"><button className={buttonClass}>{t("lecciones")}</button></Link>
          <Link to="/reserva"><button className={buttonClass}>{t("reservar")}</button></Link>
         
          <Link to="/contacto"><button className={buttonClass}>{t("contacto")}</button></Link>
          
          <Link to="/registro"><button className={buttonClass}>{t("registo")}</button></Link>
          <Link to="/login"><button className={buttonClass}>{t("login")}</button></Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-300">{t("idioma")}</span>      
          <LanguageSelector />
        </div>
      </div>

      {/* Menú móvil con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden mt-4 px-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sección usuario */}
            <div className="border-t border-gray-400 py-3">
              <div className="flex items-center gap-2 text-yellow-300 font-bold mb-2">
                <FaUser />
                {t("usuario")}
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/registro" className="hover:text-yellow-300">{t("registro")}</Link>
                <Link to="/login" className="hover:text-yellow-300">{t("login")}</Link>
                <Link to="/progreso" className="hover:text-yellow-300">{t("progreso")}</Link>
              </div>
            </div>

            {/* Sección admin */}
            <div className="border-t border-gray-400 py-3">
              <div className="flex items-center gap-2 text-yellow-300 font-bold mb-2">
                <FaTools />
                {t("admin")}
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/admin-reservas" className="hover:text-yellow-300">{t("admin")}</Link>
              </div>
            </div>

            {/* Enlaces secundarios */}
            <div className="border-t border-gray-400 py-3 text-sm">
              <Link to="/lecciones" className="block hover:text-yellow-300">{t("lecciones")}</Link>
              <Link to="/reserva" className="block hover:text-yellow-300">{t("reservar")}</Link>
              <Link to="/chat" className="block hover:text-yellow-300">{t("chat")}</Link>
              <Link to="/contacto" className="block hover:text-yellow-300">{t("contacto")}</Link>
              <Link to="/politica-privacidad" className="block hover:text-yellow-300">{t("politica_privacidad")}</Link>
              <Link to="/terminos-servicio" className="block hover:text-yellow-300">{t("terminos_servicio")}</Link>
              <Link to="/sobre-nosotros" className="block hover:text-yellow-300">{t("sobre_nosotros")}</Link>
            </div>

            {/* Selector de idioma */}
            <div className="flex justify-center items-center gap-2 mt-2 text-sm text-gray-300">
              <span>{t("idioma")}:</span>
              <LanguageSelector />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
