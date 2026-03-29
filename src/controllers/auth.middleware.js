/**
 * controllers/auth.middleware.js
 *
 * Middleware de protección de rutas mediante JWT.
 *
 * Verifica que la petición incluya un token JWT válido en el header
 * "Authorization: Bearer <token>". Si el token es válido, adjunta el
 * objeto del usuario autenticado a req.user para que los controladores
 * siguientes puedan acceder a él sin hacer otra consulta a la base de datos.
 *
 * Posibles respuestas de error:
 *   401 - No hay token en el header
 *   401 - El token es inválido o ha expirado
 *   401 - El usuario del token ya no existe en la base de datos
 */

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Middleware que valida el token JWT y agrega req.user al request.
 * Debe usarse antes de los controladores que requieren autenticacion.
 */
const protect = async (req, res, next) => {
  let token;

  // Verificar que el header Authorization existe y tiene el formato "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extraer el token eliminando el prefijo "Bearer "
      token = req.headers.authorization.split(" ")[1];

      // Verificar la firma y expiración del token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_desarrollo");

      // Buscar al usuario en la base de datos sin incluir el campo password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "No autorizado, usuario no existe" });
      }

      // Pasar al siguiente middleware o controlador
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "No autorizado, token fallido" });
    }
  } else {
    return res.status(401).json({ message: "No autorizado, no hay token" });
  }
};

module.exports = { protect };
