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
    app.patch("/api/user/:username", (req, res) => {
        //Password from request  ////////////////////////
        const reqPassword = req.body.password;

        // Function to check for blank password value
        function isBlank(str) {
            return (!str || /^\s*$/.test(str));
        }
        
        if(isBlank(reqPassword)){
            // If password is blank update all the other fields
            userModel.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                },
                {
                where: {
                    username: req.params.username
                }
            })
            .then(result =>{
                res.json({
                    status: result[0],
                    message: 'User Information Updated'
                })
                console.log('Updated', result);
            })
            .catch(err =>{
                res.json(err.errors[0].message)
                console.log("Error: ", err)
            })
        } 
        else{
            // If a password value is present we hash the value and update all the fields

            // Password Hashing  
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(reqPassword, salt);

            userModel.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash
                },
                {
                where: {
                    username: req.params.username
                }
            })
            .then(result =>{
                res.json({
                    status: result[0],
                    message: 'User Information Updated'
                })
                console.log('Updated');
            })
            .catch(err =>{
                res.json(err.errors[0].message)
                console.log("Error: ", err)
            })
        }
    });
    
    //Get All Users
    app.get("/api/user", (req, res) => {
        // if (req.session && req.session.user){
            userModel.findAll()
            .then(result => {
                res.json(result)
            })
            .catch(err =>{
                console.log("Error: ", err)
            })
        // }
        // else{
        //     res.send('login')
        // }
    });
    
    //Get User by Username
    app.get("/api/user/:username", (req, res) =>{
        userModel.findAll({
            where: { 
                username: req.params.username
            },
            raw: true,
            timestamps: false
        })
        .then(result =>{
            res.send(result)
            // firstName = result.data[0].firstName
            // lastName = result.data[0].lastName
            // username = result.data[0].username

            // //Response data to be sent
            // user = {
            //     firstName: firstName, 
            //     lastName: lastName, 
            //     username: username,
            // }
            // res.send(user)
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