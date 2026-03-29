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

  async findByBreedWithMinConfidence(raza, minConfianza = 0.6) {
    return await Dog.find({
      razasDetectadas: {
        $elemMatch: { raza: raza, confianza: { $gte: minConfianza } }
      }
    }).populate('owner', 'nombres apellidos carnet telefono email');
  }
}

module.exports = new DogRepository();
