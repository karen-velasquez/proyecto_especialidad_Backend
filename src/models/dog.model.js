const mongoose = require("mongoose");

const RAZAS = [
  "Mestizo",
  "Labrador Retriever", "Golden Retriever", "Pastor Alemán", "Bulldog Francés",
  "Bulldog Inglés", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier",
  "Dachshund", "Boxer", "Siberian Husky", "Chihuahua", "Gran Danés",
  "Dobermann", "Shih Tzu", "Border Collie", "Pomerania", "Cocker Spaniel",
  "Maltés", "Schnauzer", "Shar Pei", "Akita", "Samoyedo",
  "Weimaraner", "Basset Hound", "Dálmata", "Chow Chow", "Bichón Frisé",
  "Pug", "Shiba Inu", "Australian Shepherd", "Bernese Mountain Dog", "Pitbull"
];

const dogSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la mascota es obligatorio"],
    trim: true
  },
  genero: {
    type: String,
    enum: ["macho", "hembra"],
    required: [true, "El género es obligatorio"]
  },
  edadAnios: {
    type: Number,
    min: 0,
    default: 0
  },
  edadMeses: {
    type: Number,
    min: 0,
    max: 11,
    default: 0
  },
  raza: {
    type: String,
    enum: RAZAS,
    required: [true, "La raza es obligatoria"]
  },
  esterilizado: {
    type: Boolean,
    required: [true, "Indicar si está esterilizado es obligatorio"]
  },
  codigoEsterilizacion: {
    type: String,
    trim: true,
    default: null
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  biometricPatterns: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Dog", dogSchema);
