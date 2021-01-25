const { Sequelize } = require('sequelize');


let sequelize = new Sequelize('khazna', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',

});

module.exports = { sequelize }