/**
 * app.js
 *
 * Configuración principal de Express.
 * Registra los middlewares globales y monta las rutas de la API.
 *
 * Rutas disponibles:
 *   /api/auth   -> autenticación (registro, login)
 *   /api/dogs   -> gestión de perros
 *   /api/users  -> gestión de usuarios
 */

const express = require("express");
const app = express();

// Middleware para parsear cuerpos JSON en las peticiones entrantes
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const dogRoutes = require("./routes/dog.routes");
const userRoutes = require("./routes/user.routes");

// Montaje de rutas con prefijo /api
app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/users", userRoutes);

// Ruta raiz para verificar que la API esta activa
app.get("/", (req, res) => {
  res.send("API funcionando");
});

module.exports = app;
