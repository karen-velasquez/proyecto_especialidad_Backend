/**
 * models/dog.model.js
 *
 * Esquema de Mongoose para el modelo de Perro.
 *
 * Campos:
 *   nombre                - Nombre de la mascota (requerido)
 *   genero                - "macho" o "hembra" (requerido)
 *   edadAnios             - Años de edad del perro, minimo 0 (por defecto 0)
 *   edadMeses             - Meses adicionales de edad, entre 0 y 11 (por defecto 0)
 *   raza                  - Raza del perro, debe ser uno de los valores del arreglo RAZAS (requerido)
 *   esterilizado          - Indica si el perro está esterilizado (requerido)
 *   codigoEsterilizacion  - Código del certificado de esterilización (opcional)
 *   owner                 - Referencia al usuario propietario (requerido)
 *   foto                  - URL de la imagen almacenada en Cloudinary (opcional)
 *   biometricPatterns     - Arreglo de patrones biométricos en formato string (reservado para uso futuro)
 *   razasDetectadas       - Arreglo de razas detectadas por el modelo ML con su nivel de confianza.
 *                           Permite buscar perros por raza con filtro de confianza mínima.
 *
 * timestamps: true agrega automáticamente los campos createdAt y updatedAt.
 */

const mongoose = require("mongoose");

// Lista de razas válidas que acepta el sistema
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
    enum: RAZAS,  // Valida que la raza sea una de las permitidas
    required: [true, "La raza es obligatoria"]
  },
  esterilizado: {
    type: Boolean,
    required: [true, "Indicar si está esterilizado es obligatorio"]
  },
  codigoEsterilizacion: {
    type: String,
    trim: true,
    default: null  // Solo se llena si esterilizado es true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Referencia al modelo User
    required: true
  },
  foto: {
    type: String,
    default: null  // URL de Cloudinary, null si no se subió foto
  },
  biometricPatterns: [{
    type: String  // Patrones biométricos almacenados como strings (uso futuro)
  }],
  razasDetectadas: [{
    raza: { type: String },
    confianza: { type: Number }  // Valor entre 0 y 1 que indica la certeza del modelo ML
  }]
}, {
  timestamps: true  // Agrega createdAt y updatedAt automaticamente
});

module.exports = mongoose.model("Dog", dogSchema);
