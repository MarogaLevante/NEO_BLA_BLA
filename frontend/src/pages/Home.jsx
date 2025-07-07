import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">🌍 Alif y Olé</h1>
        <p className="text-lg text-gray-700">{t("descripcion")}</p>
      </header>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
          alt="Aprendizaje de idiomas"
          className="w-64 h-64"
        />

        <div className="max-w-md text-center md:text-left">
          <p className="mb-4 text-gray-700">
            {t("intro")}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link to="/lecciones">
              <button className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
                {t("lecciones")}
              </button>
            </Link>
            <Link to="/reserva">
              <button className="px-6 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition">
                {t("reservar")}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Alif y Olé. {t("derechos")}
      </footer>
    </div>
  );
}
