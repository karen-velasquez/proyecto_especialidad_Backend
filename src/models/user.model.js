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
    sparse: true, // permite múltiples documentos sin email (opcional)
    match: [/.+\@.+\..+/, "Por favor ingrese un correo válido"],
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    default: "user"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
