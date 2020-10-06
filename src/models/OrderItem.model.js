module.exports = (sequelize, DataTypes) => {
    return sequelize.define('orderItem', {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        prodId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'inventory',
                key: 'id'
            },
            allowNull: false,
            foreignKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'orderItem'
    });
}