// src/services/auth.service.js
// Lógica de negocio para autenticación

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');

class AuthService {
  async login({ email, password }) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET || 'secreto_desarrollo',
      { expiresIn: '1d' }
    );
    return token;
  }
}

module.exports = new AuthService();
