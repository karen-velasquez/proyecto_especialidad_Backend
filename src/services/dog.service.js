// src/services/dog.service.js
// Lógica de negocio para perros

const dogRepository = require('../repositories/dog.repository');

class DogService {
  async register({ nombre, genero, edadAnios, edadMeses, raza, esterilizado, codigoEsterilizacion, owner, foto, razasDetectadas }) {
    return await dogRepository.create({ nombre, genero, edadAnios, edadMeses, raza, esterilizado, codigoEsterilizacion, owner, foto, razasDetectadas });
  }

  async list() {
    return await dogRepository.findAll();
  }

  async findById(id) {
    return await dogRepository.findById(id);
  }

  async listByOwner(ownerId) {
    return await dogRepository.findByOwner(ownerId);
  }

  async searchByBreed(raza, minConfianza = 0.6) {
    return await dogRepository.findByBreedWithMinConfidence(raza, minConfianza);
  }
}

module.exports = new DogService();
