const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  idioma: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true }
});

module.exports = mongoose.model("Reserva", reservaSchema);
// Este modelo define la estructura de una reserva en la base de datos.
// Incluye campos para el nombre del usuario, su email, el idioma de la clase,
// la fecha y la hora de la reserva.
// Se utiliza Mongoose para interactuar con MongoDB y manejar las reservas de clases.
// Puedes agregar más campos según sea necesario, como duración de la clase,
// nivel de habilidad, etc.
// Asegúrate de que el esquema coincida con los datos que envías desde el frontend.
// Por ejemplo, si envías un campo "nivel" desde el formulario de reserva,
// deberías agregarlo aquí también:
// nivel: { type: String, required: false } // Opcional, si quieres manejar niveles de habilidad
// Luego, actualiza el formulario de reserva en el frontend para incluir este campo
// y asegúrate de que se envíe correctamente al backend.
// También puedes agregar validaciones adicionales según tus necesidades,
// como verificar que la fecha no sea pasada, que el email tenga un formato válido, etc.
// Mongoose ofrece muchas opciones para personalizar y validar tus esquemas,
// así que revisa la documentación oficial para más detalles:
// https://mongoosejs.com/docs/guide.html 