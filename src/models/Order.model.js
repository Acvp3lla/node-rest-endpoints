module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('order',{
        orderId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        tableName: 'order'
    })
}