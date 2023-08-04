const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'landing_page.html'));
});

router.get('^/$|/sort(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'sort.html'));
});


module.exports = router;