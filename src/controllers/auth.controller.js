const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 REGISTRO
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

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
    const { email, password } = req.body;

    // Buscar usuario (necesitamos pedir explícitamente el password porque está oculto en el modelo)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado"
      });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta"
      });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET || "secreto_desarrollo", // 🛡️ Uso de variable de entorno
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login exitoso",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};