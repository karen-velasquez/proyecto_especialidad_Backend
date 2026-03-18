// src/controllers/dog.controller.js
const dogService = require('../services/dog.service');

const registerDog = async (req, res) => {
  try {
    const { name, breed, age } = req.body;
    // El owner debe obtenerse del usuario autenticado (req.user.id)
    const owner = req.user.id;
    const dog = await dogService.register({ name, breed, age, owner });
    res.status(201).json({ message: 'Perro registrado correctamente', dog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listDogs = async (req, res) => {
  try {
    const dogs = await dogService.list();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerDog,
  listDogs
};
