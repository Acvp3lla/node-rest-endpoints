const axios = require('axios');
const bcrypt = require('bcrypt');

module.exports = (app)=>{
    //////////////////////////////////////////////////////////////
    //User Authentication/////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    //Login Handle
    app.post('/api/login', (req,res)=>{
        username = req.body.username;
        password = req.body.password;
        var options = {
            'method': 'GET',
            'url': `http://localhost:4000/api/user/${username}`,
        };
        axios(options)
        .then(result =>{
            //Checks for empty Array
            if (result.data.length === 0){
                //User does not exist
                res.send(false)
            }
            else{
                //Password from our DB
                hash = result.data[0].password
                //Result of the comparison
                result = bcrypt.compareSync(password, hash);
                if (result === true){
                    res.send(true);
                }
                else{
                    res.send(false);
                }
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

    //logout handle
    app.get('/api/logout',(req,res)=>{
    })
}