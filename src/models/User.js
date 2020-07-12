const Sequelize =  require('sequelize');

module.exports = function(Sequelize, DataTypes){
    return Sequelize.define("User",{
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(35),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    });
}