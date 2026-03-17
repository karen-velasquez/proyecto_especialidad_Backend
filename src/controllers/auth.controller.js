const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      message: "Usuario registrado correctamente",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register
};