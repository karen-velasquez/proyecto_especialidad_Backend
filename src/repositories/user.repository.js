// src/repositories/user.repository.js
const User = require('../models/user.model');

class UserRepository {
  async create(userData) {
    // Si email es vacío o undefined, no lo incluimos para que sparse index funcione
    if (!userData.email) {
      delete userData.email;
    }
    const user = new User(userData);
    return await user.save();
  }

  async findByCarnet(carnet) {
    return await User.findOne({ carnet }).select('+password');
  }

  async findAll() {
    return await User.find();
  }

  async updateById(id, data) {
    if (!data.email) {
      delete data.email;
    }
    return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }
}

module.exports = new UserRepository();
