const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'socialnetwork', 
    'root', 
    '', 
    {
        host : 'localhost', 
        dialect: 'mysql', 
        operatorsAliases: false
    }
);

module.exports = sequelize;
global.sequelize = sequelize;

