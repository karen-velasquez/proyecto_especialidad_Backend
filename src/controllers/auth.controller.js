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
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      if (field === 'carnet') {
        return res.status(400).json({ error: 'El carnet de identidad ya está registrado' });
      }
      if (field === 'email') {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      }
      return res.status(400).json({ error: 'Ya existe un usuario con esos datos' });
    }
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