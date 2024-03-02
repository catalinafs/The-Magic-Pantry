const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const validationsBody = require('../middlewares/validationsBody');
const {
    createValue,
    getAllValues,
    updateValueState,
    deleteValue
} = require('../controllers/parameter_values');

module.exports = (app) => {
    const router = express.Router();
    app.use('/parameter/values', router);

    const regex_C_Value = {
        value: /^[a-zA-ZáéíóúüñÑ]+$/,
        parameter_id: /^[0-9]+$/,
    };

    const regex_U_Value = {
        state: /^[0-9]+$/,
    };

    //? POST
    router.post(
        '/create',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBody(req, res, next, regex_C_Value),
        ],
        createValue
    );

    //? GET
    router.get(
        '/',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        getAllValues
    );

    //? PUT
    router.put(
        '/:id_value',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBody(req, res, next, regex_U_Value),
        ],
        updateValueState
    );

    //? DELETE
    router.delete(
        '/:id_value',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        deleteValue
    );
}