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

  async findAll() {
    return await User.find();
  }
}

module.exports = new UserRepository();
