const { User } = require('../models');

const userExists = async (id) => {
    const user = await User.findOne({ where: { id } });
    
    return !!user;
};

module.exports = { userExists };