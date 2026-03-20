// src/controllers/user.controller.js
const userService = require('../services/user.service');

const listUsers = async (req, res) => {
  try {
    const users = await userService.list();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listUsers };
