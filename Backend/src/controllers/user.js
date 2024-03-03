const { sequelize, User } = require("../models");

const updateProfile = async (req, res) => {
    const { id } = req.decode;

    res.json({ id });
    // const transaction = await sequelize.transaction();

    // try {

    // } catch (error) {

    // }
}

const deleteAccount = async (req, res) => {
    const { id } = req.decode;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await User.findOne({
            where: { id: id },
        });

        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.update({ state: 1 }, { where: { id: id } });

        await transaction.commit();

        res.status(200).json({ msg: 'User removed correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    updateProfile,
    deleteAccount,
};