const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\..+/, "Por favor ingrese un correo válido"] // Validación básica de regex
  },
  password: {
    type: String,
    required: true,
    select: false // 🛡️ Seguridad: No devolver la contraseña por defecto en las consultas
  },
  role: {
    type: String,
    default: "user"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);