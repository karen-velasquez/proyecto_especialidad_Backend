// src/repositories/user.repository.js
// Abstracción del acceso a datos para usuarios

const User = require('../models/user.model');

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await User.findOne({ email }).select('+password');
  }

  // Otros métodos de acceso a datos pueden agregarse aquí
}

module.exports = new UserRepository();
