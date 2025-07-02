
import React, { useState, useEffect } from "react";

export default function LessonViewer() {
  const [idioma, setIdioma] = useState("es");
  const [nivel, setNivel] = useState("principiante");
  const [lecciones, setLecciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarLecciones() {
      try {
        const mod = await import(`../lessons/${idioma}_${nivel}.js`);
        setLecciones(mod.default);
        setError(null);
      } catch (err) {
        console.error("❌ Error al cargar lecciones:", err.message);
        setLecciones([]);
        setError("No se pudieron cargar las lecciones seleccionadas.");
      }
    }
    cargarLecciones();
  }, [idioma, nivel]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lecciones por Idioma y Nivel</h2>

      <div className="flex gap-4 mb-4">
        {["es", "fr", "ar"].map((lang) => (
          <button
            key={lang}
            className={"px-4 py-2 rounded " + (idioma === lang ? "bg-blue-600 text-white" : "bg-gray-200")}
            onClick={() => setIdioma(lang)}
          >
            {lang === "es" ? "Español" : lang === "fr" ? "Francés" : "Árabe"}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        {["principiante", "intermedio", "avanzado"].map((niv) => (
          <button
            key={niv}
            className={"px-4 py-2 rounded " + (nivel === niv ? "bg-green-600 text-white" : "bg-gray-200")}
            onClick={() => setNivel(niv)}
          >
            {niv.charAt(0).toUpperCase() + niv.slice(1)}
          </button>
        ))}
      </div>

      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <div className="grid gap-4">
          {lecciones.length > 0 ? (
            lecciones.map((item, idx) => (
              <div key={idx} className="p-4 border rounded bg-white shadow">
                <h3 className="text-xl font-semibold">{item.tema}</h3>
                <p className="mt-2"><strong>Frase:</strong> {item.frase}</p>
                <p><strong>Traducción:</strong> {item.traduccion}</p>
                {item.transcripcion && <p><strong>Transcripción:</strong> {item.transcripcion}</p>}
              </div>
            ))
          ) : (
            <p className="italic text-gray-600">No hay lecciones disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
}
