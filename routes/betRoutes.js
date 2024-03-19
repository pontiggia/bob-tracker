const express = require('express');
const betController = require('../controllers/betController');

const router = express.Router();

router.route('/').get(betController.getAllBets);

router.route('/slots').get(betController.getAllBetsTitle);

module.exports = router;