const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', '_index.html'));
});
router.get('^/$|/welcome_page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'welcome_page.html'));
});

router.get('^/$|/style(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','css','_style.css'));
});

router.get('^/$|/script(.js)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','query','script.js'));
});

router.get('^/$|/image(.png)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','img','image.png'));
});

router.get('^/$|/font-awesome-min(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','css','font-awesome-4.7.0','css',font-awesome-min.css));
});

router.get('^/$|/remantek(.png)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','img','remantek.png'));
});



module.exports = router;