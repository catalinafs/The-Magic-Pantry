const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const { validationsBody } = require('../middlewares/validationsBody');
const { deleteAccount, updateProfile } = require('../controllers/user');
const jwt = require('jsonwebtoken');
const { token_key } = require('../config');

module.exports = (app) => {
    const router = express.Router();
    app.use('/user', router);

    const regex_U_Profile = {
        name: /^[a-zA-Z\s]+$/,
        email: /^(([^<>()\[\]\\.,;:\s@\”]+(\.[^<>()\[\]\\.,;:\s@\”]+)*)|(\”.+\”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
        password: /.{8,}/,
    };

    //? PUT
    //* update user profile
    router.put(
        '/profile',
        [
            (req, res, next) => validHeaders(req, res, next, ''),
            (req, res, next) => validationsBody(req, res, next, regex_U_Profile, false)
        ],
        updateProfile
    );

    //? DELETE
    //* delete account
    router.delete(
        '/profile',
        [
            (req, res, next) => validHeaders(req, res, next, ''),
        ],
        deleteAccount
    );

    router.get('/', (req, res) => {
        const jwtcol = jwt.sign({ id: 1, role: 1 }, token_key);
        res.json({ jwtcol });
    })
}