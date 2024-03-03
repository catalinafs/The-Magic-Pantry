const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const { validationsBody } = require('../middlewares/validationsBody');
const {
    createValue,
    getAllValues,
    updateValueState,
    deleteValue,
    getAllValuesByState
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
    //* create value
    router.post(
        '/create',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBody(req, res, next, regex_C_Value),
        ],
        createValue
    );

    //? GET
    //* bring all existing values
    router.get(
        '/',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        getAllValues
    );

    //* bring all values by status code
    router.get(
        '/:state_code',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        getAllValuesByState
    );

    //? PUT
    //* update value status code
    router.put(
        '/:id_value',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBody(req, res, next, regex_U_Value),
        ],
        updateValueState
    );

    //? DELETE
    //* delete value
    router.delete(
        '/:id_value',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        deleteValue
    );
}