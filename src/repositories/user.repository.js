// src/repositories/user.repository.js
const User = require('../models/user.model');

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findByCarnet(carnet) {
    return await User.findOne({ carnet }).select('+password');
  }

  async findAll() {
    return await User.find();
  }
}

module.exports = new UserRepository();
