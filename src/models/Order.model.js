module.exports = (sequelize, DataTypes) => {
    return sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        itemNo: {
            type: DataTypes.INTEGER,
            references: {
            model: 'inventory',
            key: 'id'
            },
            allowNull: false,
            foreignKey: true,
        },
        product: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        value: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },{
        tableName: 'order'
    });
}