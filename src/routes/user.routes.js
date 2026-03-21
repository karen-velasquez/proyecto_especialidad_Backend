const express = require('express');
const router = express.Router();
const { getMe, listUsers, updateUser } = require('../controllers/user.controller');
const { protect } = require('../controllers/auth.middleware');

router.get('/', listUsers);
router.get('/me', protect, getMe);
router.put('/me', protect, updateUser);

module.exports = router;
