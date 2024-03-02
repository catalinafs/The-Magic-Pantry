const express = require('express');
const { validHeaders } = require('../middlewares/validationsHeader');
const validationsBody = require('../middlewares/validationsBody');
const {
    createParameter,
    getAllParameters,
    updateStateParameter,
    deleteParameter,
} = require('../controllers/parameter');

module.exports = (app) => {
    const router = express.Router();
    app.use('/parameter', router);

    const regex_C_Parameter = {
        parameter_name: /^[a-zA-ZáéíóúüñÑ]+$/,
    };

    const regex_U_Parameter = {
        state: /^[0-9]+$/,
    };

    //? POST
    router.post(
        '/create',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBody(req, res, next, regex_C_Parameter),
        ],
        createParameter
    );

    //? GET
    router.get(
        '/',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        getAllParameters
    )

    //? PUT
    router.put(
        '/updateState/:id_parameter',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
            (req, res, next) => validationsBody(req, res, next, regex_U_Parameter),
        ],
        updateStateParameter
    );

    //? DELETE
    router.delete(
        '/:id_parameter',
        [
            (req, res, next) => validHeaders(req, res, next, 'Admin'),
        ],
        deleteParameter
    );
}