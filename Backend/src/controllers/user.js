const deleteUser = async (req, res) => {
    const { user_id } = req.params;

    const transaction = await sequelize.transaction();

    try {
        const userExist = await User.findOne({
            where: { id: user_id },
        });

        if (!userExist) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.update({ state: 0 }, { where: { id: user_id } });

        await transaction.commit();

        res.status(200).json({ msg: 'User removed correctly' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    deleteUser,
};