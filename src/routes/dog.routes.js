const express = require('express');
const router = express.Router();
const { registerDog, listDogs } = require('../controllers/dog.controller');
// const authMiddleware = require('../middlewares/auth'); // Descomentar cuando implementes autenticación

// router.use(authMiddleware); // Proteger rutas

router.post('/', registerDog);
router.get('/', listDogs);

module.exports = router;
