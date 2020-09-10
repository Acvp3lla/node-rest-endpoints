const expressEjsLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 4000;

const userEndpoint = require('./src/endpoints/user.endpoint');
const authEndpoint = require('./src/endpoints/auth.endpoint');

//Formats the Json Result
app.set('json spaces', 2);


//CORS Header Configurations//////////////////////////
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type: application/json');
    next();
});
app.use(cors());


///////////////////////////////////

//DB Tables
const { userModel} = require('./src/database/connection');

////////////////////////////////////////////////
//Routes
////////////////////////////////////////////////


app.get('/api', (req, res) => res.send('ok'));
userEndpoint(app, userModel);
authEndpoint(app);

app.listen(PORT, err => { 
    if (err) return console.log(`Cannot Listen on Port: ${PORT}`)
    console.log(`App is running on Port: ${PORT}`)
})