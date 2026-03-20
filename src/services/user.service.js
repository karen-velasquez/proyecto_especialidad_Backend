// src/services/user.service.js
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');

class UserService {
  async register({ nombres, apellidos, carnet, fechaNacimiento, telefono, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository.create({
      nombres,
      apellidos,
      carnet,
      fechaNacimiento,
      telefono,
      email,
      password: hashedPassword
    });
  }

  async findByCarnet(carnet) {
    return await userRepository.findByCarnet(carnet);
  }

  async list() {
    return await userRepository.findAll();
  }
}

module.exports = new UserService();
