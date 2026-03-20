// src/services/auth.service.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');

class AuthService {
  async login({ carnet, password }) {
    const user = await userService.findByCarnet(carnet);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }
    const token = jwt.sign(
      { id: user._id, carnet: user.carnet },
      process.env.JWT_SECRET || 'secreto_desarrollo',
      { expiresIn: '1d' }
    );
    return token;
  }
}

module.exports = new AuthService();
