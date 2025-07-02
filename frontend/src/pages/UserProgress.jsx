
import React, { useEffect, useState } from "react";

export default function UserProgress() {
  const [progreso, setProgreso] = useState({});

  useEffect(() => {
    const datos = localStorage.getItem("progreso_usuario");
    if (datos) {
      setProgreso(JSON.parse(datos));
    }
  }, []);

  const idiomas = ["es", "fr", "ar"];
  const niveles = ["principiante", "intermedio", "avanzado"];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📊 Panel de Progreso del Usuario</h2>

      <div className="grid gap-4">
        {idiomas.map((idioma) =>
          niveles.map((nivel) => {
            const clave = idioma + "_" + nivel;
            const datos = progreso[clave];
            return (
              <div key={clave} className="border rounded p-4 bg-white shadow">
                <h3 className="text-lg font-semibold capitalize">
                  {idioma === "es" ? "Español" : idioma === "fr" ? "Francés" : "Árabe"} - {nivel}
                </h3>
                {datos ? (
                  <>
                    <p>✅ Lecciones completadas: {datos.completadas} / {datos.total}</p>
                    <p>🕓 Última lección: {datos.ultima}</p>
                    <div className="w-full bg-gray-200 h-4 rounded mt-2">
                      <div
                        className="bg-green-500 h-4 rounded"
                        style={{ width: (datos.completadas / datos.total) * 100 + "%" }}
                      ></div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">Sin datos registrados aún.</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
