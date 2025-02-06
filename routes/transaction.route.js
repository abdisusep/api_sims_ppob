const express = require('express');
const router = express.Router();

const controller = require('../controllers/transaction.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/balance', authenticateToken, controller.getBalance);
router.post('/topup', authenticateToken, controller.insertTopup);
router.post('/transaction', authenticateToken, controller.insertTransaction);
router.get('/transaction/history', authenticateToken, controller.getTransactionHistory);

module.exports = router;