const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 4000;


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

// app.set("views", path.resolve("./src/views"));

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB Tables
const { userModel} = require('./src/database/connection');


//Routes
//////////////////////////////////////////////////////////////
//Tweet Table Routes

app.get('/', (req, res) => res.send('index'));

app.get('/api', (req, res) => res.send('ok'));


//////////////////////////////////
//  User Table Routes  //////////
/////////////////////////////////

//Create a new User
app.post('/api/user/', (req, res) => {
  userModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password
  })
  .then(result =>{
    res.json(result)
    console.log('Created')
  })
  .catch(err =>{
    res.json(err.errors[0].message)
    console.log("Cannot Create: ", err)
  })
})

//Update User Profile
app.patch( "/api/user/:id", (req, res) => {
  userModel.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password
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
    console.log("Error: ", err)
  })
});

//Get All Users
app.get( "/api/user", (req, res) => {
  userModel.findAll()
  .then(result => {
    res.json(result)
  })
  .catch(err =>{
    console.log("Error: ", err)
  })
});

//Get User by ID
app.get( "/api/user/:id", (req, res) =>{
  userModel.findAll({
    where: { id: req.params.id}
  })
  .then(result =>{
    res.json(result)
  })
  .catch(err =>{
    res.json(err.errors[0].message)
    console.log("Error: ", err)
  })
});
//////////////////////////////////////////////////////////////

app.listen(PORT, err => { 
    if (err) return console.log(`Cannot Listen on Port: ${PORT}`)
    console.log(`App is running on Port: ${PORT}`)
});