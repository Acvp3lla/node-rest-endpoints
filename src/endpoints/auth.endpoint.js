const axios = require('axios');
const bcrypt = require('bcrypt');

module.exports = (app, validatePayloadMiddleware, session)=>{
    //////////////////////////////////////////////////////////////
    //User Authentication/////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    
    // //Login Handle
    // app.post('/api/login', validatePayloadMiddleware, (req,res)=>{
    //     var mySession = session
    //     user = req.body.username;
    //     password = req.body.password;
    //     var options = {
    //         'method': 'GET',
    //         'url': `http://localhost:4000/api/user/${user}`,
    //     };
    //     axios(options)
    //     .then(result =>{
    //         //Checks for empty Array
    //         if (result.data.length === 0){
    //             //User does not exist
    //             res.status(404).send(false)
    //         }
    //         else{
    //             //Password from our DB
    //             hash = result.data[0].password
    //             //User data
    //             firstName = result.data[0].firstName
    //             lastName = result.data[0].lastName
    //             username = result.data[0].username

    //             //Response data to be sent
    //             data = {
    //                 firstName: firstName, 
    //                 lastName: lastName, 
    //                 username: username,
    //                 loggedIn: true
    //             }

    //             let session = mySession

    //             req.session.user = data
    //             console.log(session)
    //             //Result of the comparison
    //             result = bcrypt.compareSync(password, hash);
    //             if (result === true){
    //                 res.status(200).send({
    //                     user: data
    //                 });
    //             }
    //             else{
    //                 res.send(false);
    //             }
    //         }
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // })



    
    // //Check if user is logged in.
    // app.get('/api/login', (req, res) => {
    //     req.session.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
    // });

    //logout handle
    app.get('/api/logout',(req,res)=>{
    })
}