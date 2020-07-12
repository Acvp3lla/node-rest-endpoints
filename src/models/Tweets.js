const Sequelize =  require('sequelize');

module.exports = function(Sequelize, DataTypes){
    return Sequelize.define("Tweet",{
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        content: DataTypes.STRING(300)
    });
}