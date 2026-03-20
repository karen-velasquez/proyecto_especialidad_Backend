const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

const authService = require("../services/auth.service");

// 🔐 REGISTRO
const register = async (req, res) => {
  try {
    const { nombres, apellidos, carnet, fechaNacimiento, telefono, email, password } = req.body;
    await userService.register({ nombres, apellidos, carnet, fechaNacimiento, telefono, email, password });
    res.json({
      message: "Usuario registrado correctamente"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔑 LOGIN
const login = async (req, res) => {
  try {
    const { carnet, password } = req.body;
    const token = await authService.login({ carnet, password });
    res.json({
      message: "Login exitoso",
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  register,
  login
};