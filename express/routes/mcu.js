const express = require('express');
const router = express.Router();
const mcuController = require('../controllers/mcuController');

router.get('/relay', mcuController.relayActuator);
router.get('/led', mcuController.ledActuator);

router.post('/', mcuController.handleCommand);

module.exports = router;