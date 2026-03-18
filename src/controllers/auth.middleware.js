const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;

  // Verificar si hay header de autorización y empieza con Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Obtener el token del header "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_desarrollo");

      // Obtener usuario del token (sin password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Continuar a la siguiente función (el controlador)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "No autorizado, token fallido" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No autorizado, no hay token" });
  }
};

module.exports = { protect };