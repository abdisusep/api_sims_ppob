const express = require('express');
const router = express.Router();

const membershipRoutes = require('./membership.route'); 
const informationRoutes = require('./information.route'); 
const transactionRoutes = require('./transaction.route'); 

router.use('/', membershipRoutes);
router.use('/', informationRoutes);
router.use('/', transactionRoutes);

module.exports = router;	