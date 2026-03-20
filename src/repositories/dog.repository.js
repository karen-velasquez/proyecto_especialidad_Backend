// src/repositories/dog.repository.js
// Abstracción del acceso a datos para perros

const Dog = require('../models/dog.model');


class DogRepository {
  async create(dogData) {
    if (!dogData.esterilizado) {
      dogData.codigoEsterilizacion = null;
    }
    const dog = new Dog(dogData);
    return await dog.save();
  }

  async findAll() {
    return await Dog.find().populate('owner');
  }

  async findById(id) {
    return await Dog.findById(id).populate('owner');
  }

  async findByOwner(ownerId) {
    return await Dog.find({ owner: ownerId }).populate('owner');
  }

  // Otros métodos de acceso a datos pueden agregarse aquí
}

module.exports = new DogRepository();
