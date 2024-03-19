const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);

router.get('/slots', viewController.getSlotsTitle);

router.get('/slots/:slot', viewController.getSlotStats)

module.exports = router;