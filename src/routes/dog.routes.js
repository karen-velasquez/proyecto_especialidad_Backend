/**
 * routes/dog.routes.js
 *
 * Define las rutas para la gestión de perros.
 * Todas las rutas requieren autenticación JWT mediante el middleware "protect".
 *
 * POST /api/dogs                    -> registrar un nuevo perro (con foto opcional)
 * GET  /api/dogs                    -> listar los perros del usuario autenticado
 * GET  /api/dogs/search-by-breed    -> buscar perros por raza detectada con nivel de confianza mínimo
 *
 * El middleware "upload.single('foto')" intercepta el archivo adjunto en el campo
 * "foto" del formulario multipart y lo sube directamente a Cloudinary antes de
 * llegar al controlador.
 */

const express = require('express');
const router = express.Router();
const { registerDog, listDogs, searchByBreed } = require('../controllers/dog.controller');
const { protect } = require('../controllers/auth.middleware');
const { upload } = require('../config/cloudinary');

// Registrar perro: requiere autenticacion y acepta un archivo de imagen
router.post('/', protect, upload.single('foto'), registerDog);

// Listar perros del usuario autenticado
router.get('/', protect, listDogs);

// Buscar perros por raza con confianza minima (query: raza, minConfianza)
router.get('/search-by-breed', protect, searchByBreed);

module.exports = router;
