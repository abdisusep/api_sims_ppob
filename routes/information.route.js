const express = require('express');
const router = express.Router();

const controller = require('../controllers/information.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/banner', authenticateToken, controller.getBanner);
router.get('/services', authenticateToken, controller.getService);

module.exports = router;