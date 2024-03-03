const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const validationsBody = require('../middlewares/validationsBody');

module.exports = (app) => {
    const router = express.Router();
    app.use('/auth', router);

    const regex_C_Register = {
        name: /^[a-zA-Z\s]+$/,
        role: /^(Admin|Client)$/,
        email: /^(([^<>()\[\]\\.,;:\s@\”]+(\.[^<>()\[\]\\.,;:\s@\”]+)*)|(\”.+\”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
        password: /.{8,}/,
    };

    //? DELETE
    router.delete(
        '/:user_id',
        [
            (req, res, next) => validHeaders(req, res, next, ''),
        ],
        deleteUser
    );
}