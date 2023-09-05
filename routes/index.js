const express = require('express');
const db = require('../db');

const router = express.Router();

// get the homepage

router.get('/index', (req, res, next)=>{
    res.locals.filter = null;
    res.render('index');
});

router.get('/', (req, res, next)=>{
    res.render('home');
});

module.exports = router;