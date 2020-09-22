const Sequelize = require('sequelize');
const dotenv = require('dotenv');

const userSchema = require('../models/User.model');
const inventorySchema = require('../models/Inventory.model');

dotenv.config();


const sequelize_postGres = new Sequelize(
    process.env.PG_DATABASE_NAME, 
    process.env.PG_DB_USERNAME, 
    process.env.PG_DB_PASSWORD, {
        host: process.env.PG_DB_HOST,
        port: process.env.PG_DB_PORT,
        dialect: 'postgres',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    logging: false //Disables sequelize from outputing SQL Logs to the console
});

const userModel = userSchema(sequelize_postGres, Sequelize);
const inventoryModel = inventorySchema(sequelize_postGres, Sequelize);

//PostGres Sync
sequelize_postGres.sync({ force: false })//Force = false prevents our Controller from dropping tables if they already exists
  .then(() => {
    console.log('PostGres Sync successful');
  }).catch(err=>{
    console.log("unable to connect: ", err);
});

module.exports = {
    sequelize_postGres,
    userModel,
    inventoryModel
}