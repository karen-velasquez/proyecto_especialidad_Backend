// src/services/dog.service.js
// Lógica de negocio para perros

const dogRepository = require('../repositories/dog.repository');

class DogService {
  async register({ name, breed, age, owner }) {
    return await dogRepository.create({ name, breed, age, owner });
  }

  async list() {
    return await dogRepository.findAll();
  }

  async findById(id) {
    return await dogRepository.findById(id);
  }
}

module.exports = new DogService();
