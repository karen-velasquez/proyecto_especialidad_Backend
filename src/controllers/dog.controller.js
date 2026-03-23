// src/controllers/dog.controller.js
const dogService = require('../services/dog.service');

const registerDog = async (req, res) => {
  try {
    const { nombre, genero, edadAnios, edadMeses, raza, codigoEsterilizacion } = req.body;
    const esterilizado = req.body.esterilizado === true || req.body.esterilizado === 'true';
    const owner = req.user._id;
    const foto = req.file ? req.file.path : null;
    let razasDetectadas = [];
    if (req.body.razasDetectadas) {
      try {
        razasDetectadas = typeof req.body.razasDetectadas === 'string'
          ? JSON.parse(req.body.razasDetectadas)
          : req.body.razasDetectadas;
      } catch (_) {}
    }
    const dog = await dogService.register({ nombre, genero, edadAnios, edadMeses, raza, esterilizado, codigoEsterilizacion, owner, foto, razasDetectadas });
    res.status(201).json({ message: 'Perro registrado correctamente', dog });
  } catch (error) {
    res.status(500).json({ error: error.message, detalle: error.errors || error.toString() });
  }
};

const searchByBreed = async (req, res) => {
  try {
    const { raza, minConfianza } = req.query;
    if (!raza) return res.status(400).json({ error: 'Parámetro raza requerido' });
    const confidence = minConfianza ? parseFloat(minConfianza) : 0.6;
    const dogs = await dogService.searchByBreed(raza, confidence);
    res.json(dogs);
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
  listDogs,
  searchByBreed
};
