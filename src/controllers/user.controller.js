// src/controllers/user.controller.js
const userService = require('../services/user.service');

const getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await userService.list();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nombres, apellidos, fechaNacimiento, telefono, email } = req.body;
    const updated = await userService.update(req.user._id, { nombres, apellidos, fechaNacimiento, telefono, email });
    res.json({ message: "Usuario actualizado correctamente", user: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMe, listUsers, updateUser };
