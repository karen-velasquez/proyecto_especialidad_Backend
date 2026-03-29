/**
 * routes/auth.routes.js
 *
 * Define las rutas públicas de autenticación.
 * Estas rutas no requieren token JWT.
 *
 * POST /api/auth/register -> registrar un nuevo usuario
 * POST /api/auth/login    -> iniciar sesión y obtener un token JWT
 */

const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
