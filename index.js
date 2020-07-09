//import express from 'express';
//import bodyParser from 'body-parser';
import db from './src/database/connection';
import apiTweet from './app/api/tweet'
import apiUser from './app/api/user';



//Node.js Express Framework
const express = require('express');
let app = express();

//Port to listen on
const PORT = process.env.PORT || 4000;

const path = require('path');
const bodyParser = require('body-parser');


const exphbs = require('express-handlebars');
const { json } = require('body-parser');

//Custom Templating Engine
//app.set('json spaces', 2);
app.set('view engine', "pug");

app.set("views", path.resolve("./src/views"));

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Create Express Router
const router = express.Router();
app.use(router);

const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));

//DB connection
require("./src/database/connection");

require("./src/bootstrap")();

router.use((err, req, res, next) => {
    if(err){
        //Handle file type and max size of image
        return res.send(err.message);
    }
});


//////////////////////////////////////////////////////////////
//let result = {name: 'luciano'};
//app.get('/', (req, res) => res.send(JSON.stringify(result)));

apiTweet(app, db);
apiUser(app, db);
//////////////////////////////////////////////////////////////

app.listen(PORT, err => { 
    if (err) return console.log(`Cannot Listen on Port: ${PORT}`)
    console.log(`App is listening on Port: ${PORT}`)
});