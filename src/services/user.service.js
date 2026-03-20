// src/services/user.service.js
// Lógica de negocio para usuarios

const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');


class UserService {
  async register({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository.create({ name, email, password: hashedPassword });
  }

  async findByEmail(email) {
    return await userRepository.findByEmail(email);
  }

  async list() {
    return await userRepository.findAll();
  }
}

module.exports = new UserService();
