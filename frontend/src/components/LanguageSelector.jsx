
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={handleLanguageChange}
      defaultValue={i18n.language}
      className="bg-white text-sm text-gray-700 border border-gray-300 rounded px-2 py-1 ml-4"
    >
      <option value="es">🇪🇸 Español</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="ar">🇸🇦 العربية</option>
    </select>
  );
}
