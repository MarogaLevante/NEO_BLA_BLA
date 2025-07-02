
import React, { useState } from "react";

const contenidos = {
  saludos: {
    frase: {
      español: "Hola, ¿cómo estás?",
      francés: "Bonjour, comment ça va ?",
      árabe: "مرحبا، كيف حالك؟"
    },
    traduccion: {
      español: "Hello, how are you?",
      francés: "Hello, how are you?",
      árabe: "Hello, how are you?"
    },
    actividad: {
      tipo: "rellenar",
      pregunta: "____, ¿cómo estás?",
      respuesta: "Hola"
    }
  },
  comida: {
    frase: {
      español: "Quisiera una ensalada, por favor.",
      francés: "Je voudrais une salade, s'il vous plaît.",
      árabe: "أريد سلطة، من فضلك."
    },
    traduccion: {
      español: "I would like a salad, please.",
      francés: "I would like a salad, please.",
      árabe: "I would like a salad, please."
    },
    actividad: {
      tipo: "opciones",
      pregunta: "¿Qué significa 'Quisiera una ensalada'?",
      opciones: ["I want bread", "I would like a salad", "I need water"],
      respuesta: "I would like a salad"
    }
  }
};

export default function LessonsTab() {
  const [idioma, setIdioma] = useState("español");
  const [tema, setTema] = useState("saludos");
  const [respuesta, setRespuesta] = useState("");
  const [feedback, setFeedback] = useState("");

  const leccion = contenidos[tema];

  const verificar = () => {
    const correcta =
      leccion.actividad.tipo === "rellenar"
        ? respuesta.trim().toLowerCase() === leccion.actividad.respuesta.toLowerCase()
        : respuesta === leccion.actividad.respuesta;
    setFeedback(correcta ? "✅ ¡Correcto!" : "❌ Intenta otra vez.");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lecciones Interactivas</h2>

      <div className="flex gap-4 mb-4">
        {["español", "francés", "árabe"].map((lang) => (
          <button
            key={lang}
            className={"px-4 py-2 rounded " + (idioma === lang ? "bg-blue-600 text-white" : "bg-gray-200")}
            onClick={() => setIdioma(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        {Object.keys(contenidos).map((t) => (
          <button
            key={t}
            className={"px-4 py-2 rounded " + (tema === t ? "bg-green-600 text-white" : "bg-gray-200")}
            onClick={() => {
              setTema(t);
              setRespuesta("");
              setFeedback("");
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-xl font-semibold mb-2 capitalize">{tema}</h3>
        <p><strong>Frase:</strong> {leccion.frase[idioma]}</p>
        <p><strong>Traducción:</strong> {leccion.traduccion[idioma]}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Actividad</h4>
        <p className="mb-2">{leccion.actividad.pregunta}</p>

        {leccion.actividad.tipo === "rellenar" ? (
          <input
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
        ) : (
          <div className="flex flex-col gap-2 mb-2">
            {leccion.actividad.opciones.map((op, idx) => (
              <label key={idx} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="opcion"
                  value={op}
                  checked={respuesta === op}
                  onChange={() => setRespuesta(op)}
                />
                {op}
              </label>
            ))}
          </div>
        )}
        <button onClick={verificar} className="bg-blue-500 text-white px-4 py-2 rounded">
          Comprobar
        </button>
        {feedback && <p className="mt-2 font-medium">{feedback}</p>}
      </div>
    </div>
  );
}
