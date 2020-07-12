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

require("./src/bootstrap");

router.use((err, req, res, next) => {
    if(err){
        //Handle file type and max size of image
        return res.send(err.message);
    }
});

//Routes
//////////////////////////////////////////////////////////////
const { userModel, tweetModel } = require('./src/database/connection');

app.get('/', (req, res) => res.send('index'));
app.get('/api', (req, res) => res.send('ok'));

app.get( "/api/tweet", (req, res) =>
    tweetModel.findAll()
    .then( result => {
        res.json(result)
        console.log('Success')
    })
    .catch(err =>{
        console.log("Error: ", err)
    })
);

app.get( "/api/tweet/:id", (req, res) =>
    tweetModel.findAll({
    where:{id: req.params.id}})
    .then( result => {
        res.json(result)
        console.log('Success')
    })
    .catch(err =>{
        console.log("Error: ", err)
    })
);
app.delete( "/api/tweet/:id", (req, res) =>
    tweetModel.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => {
        console.log("Tweet Deleted")
        res.json(result)
    })
    .catch(err =>{
        console.log("Error: ", err)
    })
  );
//////////////////////////////////
//User Routes
app.get( "/api/user", (req, res) =>
  userModel.findAll()
  .then(result => res.json(result))
  .catch(err =>{
      console.log("Error: ", err)
    })
);

app.put( "/api/user/:id", (req, res) =>
    userModel.update({
        username: req.body.content,
        password: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      }).then(result => res.json(result))
      .catch(err =>{
        console.log("Error: ", err)
      })
    );
//////////////////////////////////////////////////////////////

app.listen(PORT, err => { 
    if (err) return console.log(`Cannot Listen on Port: ${PORT}`)
    console.log(`App is listening on Port: ${PORT}`)
});