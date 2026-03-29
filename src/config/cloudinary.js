/**
 * config/cloudinary.js
 *
 * Configuración del servicio de almacenamiento de imágenes en la nube (Cloudinary).
 *
 * Se configura:
 *   - La conexión a Cloudinary usando las credenciales del archivo .env
 *   - El almacenamiento con multer-storage-cloudinary para subir imágenes directamente
 *     desde el request HTTP a Cloudinary sin guardarlas en disco local
 *   - La carpeta destino y los formatos de imagen permitidos
 *   - Una transformación automática que limita el tamaño máximo a 800x800 px
 *
 * Exporta:
 *   cloudinary -> instancia configurada de Cloudinary
 *   upload     -> middleware de multer listo para usar en las rutas
 */

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configurar Cloudinary con las credenciales del archivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Definir el almacenamiento: carpeta, formatos permitidos y transformación de tamaño
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'dog_biometric/perros',           // Carpeta en Cloudinary donde se guardan las fotos
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }], // Redimensiona sin recortar
  },
});

// Middleware de multer que usa el almacenamiento de Cloudinary
const upload = multer({ storage });

module.exports = { cloudinary, upload };
