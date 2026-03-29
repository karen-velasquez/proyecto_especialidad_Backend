/**
 * routes/user.routes.js
 *
 * Define las rutas para la gestión del perfil de usuario.
 *
 * GET /api/users       -> listar todos los usuarios (ruta pública, sin autenticación)
 * GET /api/users/me    -> obtener el perfil del usuario autenticado
 * PUT /api/users/me    -> actualizar los datos del usuario autenticado
 *
 * Las rutas /me requieren token JWT mediante el middleware "protect".
 */

const express = require('express');
const router = express.Router();
const { getMe, listUsers, updateUser } = require('../controllers/user.controller');
const { protect } = require('../controllers/auth.middleware');

// Ruta publica: listar todos los usuarios registrados
router.get('/', listUsers);

// Rutas protegidas: requieren autenticacion JWT
router.get('/me', protect, getMe);
router.put('/me', protect, updateUser);

module.exports = router;
