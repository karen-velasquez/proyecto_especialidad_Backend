/**
 * models/user.model.js
 *
 * Esquema de Mongoose para el modelo de Usuario.
 *
 * Campos:
 *   nombres          - Nombres del propietario (requerido)
 *   apellidos        - Apellidos del propietario (requerido)
 *   carnet           - Carnet de identidad, único en la base de datos (requerido)
 *   fechaNacimiento  - Fecha de nacimiento, usado para verificar mayoría de edad (requerido)
 *   telefono         - Número de teléfono celular (requerido)
 *   email            - Correo electrónico, opcional y único si se provee
 *                      Usa índice sparse para permitir múltiples documentos sin email
 *   password         - Contraseña hasheada con bcrypt (requerido)
 *                      select:false evita que se retorne en las consultas por defecto
 *   role             - Rol del usuario, por defecto "user"
 *
 * timestamps: true agrega automáticamente los campos createdAt y updatedAt.
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: [true, "Los nombres son obligatorios"],
    trim: true
  },
  apellidos: {
    type: String,
    required: [true, "Los apellidos son obligatorios"],
    trim: true
  },
  carnet: {
    type: String,
    required: [true, "El carnet de identidad es obligatorio"],
    unique: true,
    trim: true
  },
  fechaNacimiento: {
    type: Date,
    required: [true, "La fecha de nacimiento es obligatoria"]
  },
  telefono: {
    type: String,
    required: [true, "El teléfono celular es obligatorio"],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Permite múltiples documentos sin email (campo opcional)
    match: [/.+\@.+\..+/, "Por favor ingrese un correo válido"],
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false  // No se incluye en los resultados de consulta por defecto
  },
  role: {
    type: String,
    default: "user"
  }
}, {
  timestamps: true  // Agrega createdAt y updatedAt automaticamente
});

module.exports = mongoose.model("User", userSchema);
