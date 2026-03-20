// src/controllers/dog.controller.js
const dogService = require('../services/dog.service');

const registerDog = async (req, res) => {
  try {
    const { nombre, genero, edadAnios, edadMeses, raza, esterilizado, codigoEsterilizacion } = req.body;
    const owner = req.user._id;
    const dog = await dogService.register({ nombre, genero, edadAnios, edadMeses, raza, esterilizado, codigoEsterilizacion, owner });
    res.status(201).json({ message: 'Perro registrado correctamente', dog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listDogs = async (req, res) => {
  try {
    // Solo listar perros cuyo owner sea el usuario autenticado
    const ownerId = req.user?._id;
    if (!ownerId) {
      return res.status(401).json({ error: 'No autorizado, usuario no autenticado' });
    }
    const dogs = await dogService.listByOwner(ownerId);
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerDog,
  listDogs
};
