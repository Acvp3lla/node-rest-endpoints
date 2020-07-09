const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const { json } = require('body-parser');

let app = express();

app.set('json spaces', 2);


let result = {name: 'luciano'};

app.get('/', (req, res) => res.send(JSON.stringify(result)));

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> console.log(`App was started on Port: ${PORT}`));