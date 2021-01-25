const {  DataTypes } = require('sequelize');
const { sequelize } = require("../config/dbConnections");
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {

    firstName: {
        type: DataTypes.STRING
    },

    lastName: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },

    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 1000
    }
});


User.beforeCreate(async (user, options) => {

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    return user
});

module.exports = User;