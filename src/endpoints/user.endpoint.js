const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const saltRounds= 10;

module.exports = (app, userModel) => {
    //////////////////////////////////
    //  User Table Routes  //////////
    /////////////////////////////////

    //Create a new User
    app.post('/api/user/', (req, res) => {
        //Password Hashing  ////////////////////////
        const reqPassword = req.body.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(reqPassword, salt);

        // result = bcrypt.compareSync(reqPassword, hash);
        // console.log(result);

        userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hash
        })
        .then(result =>{
        res.json(result)
        console.log('Created')
        })
        .catch(err =>{
        // res.json(err.errors[0].message)
        res.json(err.errors)
        console.log("Cannot Create: ", err.errors)
        })
    })

    
    //Update User Profile
    app.patch("/api/user/:id", (req, res) => {
        //Password Hashing  ////////////////////////
        const reqPassword = req.body.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(reqPassword, salt);

        userModel.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hash
        },
        {
        where: {
            id: req.params.id
        }
        }).then(result =>{
        res.json(result)
        })
        .catch(err =>{
        res.json(err.errors[0].message)
        // res.json(err)
        console.log("Error: ", err)
        })
    });
    
    //Get All Users
    app.get("/api/user", (req, res) => {
        userModel.findAll()
        .then(result => {
        res.json(result)
        })
        .catch(err =>{
        console.log("Error: ", err)
        })
    });
    
    //Get User by Username
    app.get("/api/user/:username", (req, res) =>{
        userModel.findAll({
        where: { username: req.params.username}
        })
        .then(result =>{
        res.send(result)
        })
        .catch(err =>{
        res.json(err.errors[0].message)
        console.log("Error: ", err)
        })
    });

    app.delete("/api/user/delete/:id", (req, res) => {
        userModel.destroy({
            where: {id: req.params.id}
        })
        .then(result =>{
            res.json(result)
            console.log("User Removed")
        })
        .catch(err =>{
            res.json(err.errors[0].message)
            console.log("Could not delete: ", err)
        })
    })
}