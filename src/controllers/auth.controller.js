const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

const authService = require("../services/auth.service");
// 🔑 LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login({ email, password });
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