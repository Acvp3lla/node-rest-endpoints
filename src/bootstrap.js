module.exports = async () => {
    const Tweet = require("./models/Tweets");
    const User = require("./models/User");

    User.hasMany(Tweet, { as: "Tweets", foreignKey: 'userId' });
    Tweet.belongsTo(User, { as: "User", foreignKey: 'userId' });

    const errHandler = (err) =>{
        console.log("Error", err);
    }

    const user = await User.create({
        username: "acvp3lla", 
        password: '2014ForestHillsDrive'
    }).catch(errHandler);

    const tweet = await Tweet.create({
        content: "First things first...", 
        userId: user.id
    }).catch(errHandler);

    const users = await User.findAll({ where: { username: 'acvp3lla' }, include: [{model: Tweet, as: "Tweets"}] }).catch(errHandler);

    console.log("Acvp3lla's Tweets: ", users);

}