const express = require('express');
const router = express.Router();
const { registerDog, listDogs, searchByBreed } = require('../controllers/dog.controller');
const { protect } = require('../controllers/auth.middleware');
const { upload } = require('../config/cloudinary');

router.post('/', protect, upload.single('foto'), registerDog);
router.get('/', protect, listDogs);
router.get('/search-by-breed', protect, searchByBreed);

module.exports = router;
