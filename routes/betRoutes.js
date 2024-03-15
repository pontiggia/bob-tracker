const express = require('express');
const betController = require('../controllers/betController');

const router = express.Router();

router.route('/').get(betController.getAllBets);


module.exports = router;