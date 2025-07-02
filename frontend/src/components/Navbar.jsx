
import React from "react";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg hover:text-yellow-300">
          🌍 NEO BLA BLA
        </Link>
        <div className="flex gap-4 text-sm items-center">
          <Link to="/lecciones" className="hover:text-yellow-300">{t("lecciones")}</Link>
          <Link to="/reserva" className="hover:text-yellow-300">{t("reservar")}</Link>
          <Link to="/chat" className="hover:text-yellow-300">{t("chat")}</Link>
          <Link to="/progreso" className="hover:text-yellow-300">{t("progreso")}</Link>
          <Link to="/admin-reservas" className="hover:text-yellow-300">{t("admin")}</Link>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}
// This component renders a responsive navigation bar with links to different pages and a language selector.
// It uses React Router for navigation and i18next for internationalization.
// The navbar is styled with Tailwind CSS classes for a modern look and feel.
// The `useTranslation` hook is used to access the translation function `t`, which allows for dynamic text rendering based on the selected language.
// The navbar is sticky, meaning it will remain at the top of the viewport when scrolling.
// The `z-50` class ensures that the navbar appears above other content on the page, preventing overlap issues.
// The `hover:text-yellow-300` class adds a hover effect to the links, changing their color to yellow when hovered over, enhancing user experience.
// The `max-w-6xl mx-auto` classes center the navbar content and limit its maximum width, ensuring it looks good on larger screens while remaining responsive on smaller devices.
// The `flex` classes are used to create a flexible layout that adjusts the spacing and alignment of the navbar items, making it easy to read and navigate.
// The `text-sm` class sets the font size of the links