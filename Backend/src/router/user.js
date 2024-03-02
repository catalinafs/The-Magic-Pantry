const express = require('express');
const user = require('../models');
const validations = require('../middlewares/validationsBody');

module.exports = (app) => {
    const router = express.Router();
    app.use('/user', router);

    const regex = {
        hola: 'holis',
        como: 'estas',
    }

    //? POST
    router.post('/create', (req, res, next) => validations(req, res, next, regex));
}