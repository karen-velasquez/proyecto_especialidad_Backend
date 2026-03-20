const express = require('express');
const router = express.Router();
const { registerDog, listDogs } = require('../controllers/dog.controller');
const { protect } = require('../controllers/auth.middleware');

router.post('/', protect, registerDog);
router.get('/', protect, listDogs);

module.exports = router;
