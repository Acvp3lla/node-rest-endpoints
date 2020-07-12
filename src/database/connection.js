const Sequelize = require('sequelize');

const user = require('../models/User');
const tweet = require('../models/Tweets')

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

const userModel = user(sequelize, Sequelize);
const tweetModel = tweet(sequelize, Sequelize);
global.sequelize = sequelize;


module.exports = {
    sequelize,
    userModel,
    tweetModel
}