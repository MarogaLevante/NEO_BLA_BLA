
import React, { useState } from "react";

const data = {
  es: {
    principiante: [
      { tema: "Saludos", ejemplo: "Hola, ¿cómo estás?", traduccion: "Hello, how are you?" },
      { tema: "Despedidas", ejemplo: "Hasta luego", traduccion: "See you later" }
    ],
    intermedio: [
      { tema: "Viajes", ejemplo: "¿Dónde está la estación?", traduccion: "Where is the station?" }
    ],
    avanzado: [
      { tema: "Trabajo", ejemplo: "Me gustaría solicitar este puesto", traduccion: "I would like to apply for this job" }
    ]
  },
  fr: {
    principiante: [
      { tema: "Salutations", ejemplo: "Bonjour, comment ça va ?", traduccion: "Hello, how are you?" }
    ],
    intermedio: [
      { tema: "Restaurant", ejemplo: "Je voudrais un café", traduccion: "I would like a coffee" }
    ],
    avanzado: [
      { tema: "Affaires", ejemplo: "Je suis responsable du projet", traduccion: "I am responsible for the project" }
    ]
  },
  ar: {
    principiante: [
      { tema: "التحيات (Saludos)", ejemplo: "مرحبا، كيف حالك؟", traduccion: "Hola, ¿cómo estás?" }
    ],
    intermedio: [
      { tema: "السفر (Viajes)", ejemplo: "أين محطة القطار؟", traduccion: "¿Dónde está la estación de tren?" }
    ],
    avanzado: [
      { tema: "العمل (Trabajo)", ejemplo: "أرغب في التقدم لهذا المنصب", traduccion: "Deseo postularme para este puesto" }
    ]
  }
};

export default function Lessons() {
  const [idioma, setIdioma] = useState("es");
  const [nivel, setNivel] = useState("principiante");

  const niveles = ["principiante", "intermedio", "avanzado"];
  const idiomas = { es: "Español", fr: "Francés", ar: "Árabe" };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📚 Lecciones por idioma y nivel</h1>

      <div className="flex gap-4 mb-4">
        {Object.entries(idiomas).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setIdioma(key)}
            className={`px-4 py-2 rounded ${idioma === key ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-4">
        {niveles.map((niv) => (
          <button
            key={niv}
            onClick={() => setNivel(niv)}
            className={`px-4 py-2 rounded ${nivel === niv ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            {niv.charAt(0).toUpperCase() + niv.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(data[idioma][nivel] || []).map((leccion, idx) => (
          <div key={idx} className="border p-4 rounded shadow bg-white">
            <h3 className="font-semibold text-lg mb-1">{leccion.tema}</h3>
            <p className="mb-1">🗣️ {leccion.ejemplo}</p>
            <p className="text-gray-600">💬 {leccion.traduccion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
