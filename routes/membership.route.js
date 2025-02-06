const express = require('express');
const router = express.Router();

const controller = require('../controllers/membership.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/registration', controller.registrationUser);
router.post('/login', controller.loginUser);
router.get('/profile', authenticateToken, controller.getProfile);
router.put('/profile/update', authenticateToken, controller.updateProfile);
router.put('/profile/image', authenticateToken, controller.updateImage);

module.exports = router;