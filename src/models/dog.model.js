const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del perro es obligatorio"],
    trim: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 0
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 🔗 Relación con el modelo User
    required: true
  },
  biometricPatterns: [{
    type: String // Aquí podrías guardar referencias a los vectores o IDs de las imágenes procesadas
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Dog", dogSchema);