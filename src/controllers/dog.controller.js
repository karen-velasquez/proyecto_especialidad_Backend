/**
 * controllers/dog.controller.js
 *
 * Controlador de perros.
 * Maneja las peticiones HTTP relacionadas con el registro,
 * listado y búsqueda de perros.
 * Delega la lógica de negocio al servicio DogService.
 */

const dogService = require('../services/dog.service');

/**
 * Registra un nuevo perro vinculado al usuario autenticado.
 *
 * Recibe del body (multipart/form-data):
 *   nombre, genero, edadAnios, edadMeses, raza, esterilizado,
 *   codigoEsterilizacion (opcional), razasDetectadas (JSON string, opcional)
 *
 * Recibe del middleware de Cloudinary (req.file):
 *   path -> URL pública de la imagen subida a Cloudinary
 *
 * El campo "esterilizado" llega como string desde el formulario multipart,
 * por eso se convierte explicitamente a booleano.
 *
 * El campo "razasDetectadas" llega como JSON string y se parsea antes de guardar.
 */
const registerDog = async (req, res) => {
  try {
    const { nombre, genero, edadAnios, edadMeses, raza, codigoEsterilizacion } = req.body;

    // Convertir a booleano porque multipart/form-data envía todo como string
    const esterilizado = req.body.esterilizado === true || req.body.esterilizado === 'true';

    // El owner es el usuario autenticado, obtenido desde req.user por el middleware JWT
    const owner = req.user._id;

    // La foto es la URL de Cloudinary si se subió un archivo, null en caso contrario
    const foto = req.file ? req.file.path : null;

    // Parsear las razas detectadas por el modelo ML (llegan como JSON string)
    let razasDetectadas = [];
    if (req.body.razasDetectadas) {
      try {
        razasDetectadas = typeof req.body.razasDetectadas === 'string'
          ? JSON.parse(req.body.razasDetectadas)
          : req.body.razasDetectadas;
      } catch (_) {
        // Si el JSON es inválido, se guarda un arreglo vacío
      }
    }

    const dog = await dogService.register({
      nombre, genero, edadAnios, edadMeses, raza,
      esterilizado, codigoEsterilizacion,
      owner, foto, razasDetectadas
    });

    res.status(201).json({ message: 'Perro registrado correctamente', dog });
  } catch (error) {
    res.status(500).json({ error: error.message, detalle: error.errors || error.toString() });
  }
};

/**
 * Busca perros por raza detectada con un nivel de confianza mínimo.
 *
 * Recibe por query string:
 *   raza        -> nombre de la raza a buscar (requerido)
 *   minConfianza -> valor entre 0 y 1, por defecto 0.6 (60%)
 *
 * Retorna los perros cuya lista "razasDetectadas" contiene la raza buscada
 * con una confianza mayor o igual al mínimo indicado.
 * Incluye los datos del propietario (owner) en la respuesta.
 */
const searchByBreed = async (req, res) => {
  try {
    const { raza, minConfianza } = req.query;
    if (!raza) return res.status(400).json({ error: 'Parámetro raza requerido' });

    const confidence = minConfianza ? parseFloat(minConfianza) : 0.6;
    const dogs = await dogService.searchByBreed(raza, confidence);
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Lista todos los perros registrados por el usuario autenticado.
 *
 * Usa el _id del usuario en req.user para filtrar solo sus perros.
 * Retorna un arreglo vacío si el usuario no tiene perros registrados.
 */
const listDogs = async (req, res) => {
  try {
    const ownerId = req.user?._id;
    if (!ownerId) {
      return res.status(401).json({ error: 'No autorizado, usuario no autenticado' });
    }
    const dogs = await dogService.listByOwner(ownerId);
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerDog,
  listDogs,
  searchByBreed
};
