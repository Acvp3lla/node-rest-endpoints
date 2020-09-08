module.exports = function(sequelize, DataTypes){
    return sequelize.define("user",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(35),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
    },{
        tableName: 'user'
    });
}