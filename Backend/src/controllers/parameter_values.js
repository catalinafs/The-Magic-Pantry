const { sequelize, Parameter_Values, Parameter } = require("../models");

const createValue = async (req, res) => {
    const { value, parameter_id } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const parameterExist = await Parameter.findOne({
            where: { id: parameter_id },
        });

        if (!parameterExist) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'Parameter not found' });
        }

        const valueExist = await Parameter_Values.findOne({
            where: { value: value },
        });

        if (valueExist) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'The value already exists' });
        }

        await Parameter_Values.create({ value: value, parameter_id: parameter_id });

        await transaction.commit();

        res.json({ msg: 'The value was added correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllValues = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const values = await Parameter_Values.findAll({
            where: { state: 1 },
        });

        if (values.length === 0) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'There are no values yet' });
        }

        res.status(200).json({ values: values });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllValuesByState = async (req, res) => {
    const { state_code } = req.params

    const transaction = await sequelize.transaction();

    try {
        const values = await Parameter_Values.findAll({
            where: { state: state_code },
        });

        if (values.length === 0) {
            await transaction.rollback();

            return res.status(404).json({ msg: `There are still no values with the state ${state_code}` });
        }

        res.status(200).json({ values: values });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const updateValueState = async (req, res) => {
    const { id_value } = req.params;
    const { state } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const valueExist = await Parameter_Values.findOne({
            where: { id: id_value },
        });

        if (!valueExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'Value not found' });
        }

        await Parameter_Values.update({ state: state }, { where: { id: id_value } });

        await transaction.commit();

        res.json({ msg: 'Value updated correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const deleteValue = async (req, res) => {
    const { id_value } = req.params;

    const transaction = await sequelize.transaction();

    try {
        const valueExist = await Parameter_Values.findOne({
            where: { id: id_value },
        });

        if (!valueExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'Value not found' });
        }

        await Parameter_Values.update({ state: 0 }, { where: { id: id_value } });

        await transaction.commit();

        res.json({ msg: 'Value removed correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    createValue,
    getAllValues,
    getAllValuesByState,
    updateValueState,
    deleteValue,
};