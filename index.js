const expressEjsLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 4000;

const userEndpoint = require('./src/endpoints/user.endpoint');
const orderItemEndpoint = require('./src/endpoints/OrderItem.endpoint');
const inventoryEndpoint = require('./src/endpoints/Inventory.endpoint');
const authEndpoint = require('./src/endpoints/auth.endpoint');

//Formats the Json Result
app.set('json spaces', 2);


//CORS Header Configurations//////////////////////////
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//     res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Content-Type: application/json');
//     next();
// });
// app.use(cors());

app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));


//DB Tables
const { userModel, inventoryModel, orderItemModel, orderModel} = require('./src/database/connection');

/////////////////////////////////
// Session Management

// app.use(cookieParser());
// app.use(session({
//     key: 'user_sid',
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires:(1000 * 60 * 100)
//     }
// }));

// Middleware to check if user's cookie is still saved in browser
// If not set, then automatically log the user out.
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');        
//     }
//     next();
// });

// // middleware function to check for logged-in users
// var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/login');
//     } else {
//         next();
//     }    
// };


const mySession = session({
    // key: 'user_sid',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires:(60 * 1000 * 60)
    }
});
app.use(mySession);
    

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});



// Middleware to check that a payload is present
const validatePayloadMiddleware = (req, res, next) => {
    if(req.body){
        next();
    }
    else{
        res.status(403).send({
            errors: 'You need a payload'
        });
    }
};



////////////////////////////////////////////////
//Routes
////////////////////////////////////////////////


const axios = require('axios');
const bcrypt = require('bcrypt');
const OrderEndpoint = require('./src/endpoints/OrderItem.endpoint');

//Login Handle
app.post('/api/login', validatePayloadMiddleware, (req,res)=>{
    user = req.body.username;
    password = req.body.password;
    var options = {
        'method': 'GET',
        'url': `http://localhost:4000/api/user/${user}`,
    };
    axios(options)
    .then(result =>{
        //If user is not found the data will be an empty array
        //Checks for empty Array
        if (result.data.length === 0){
            //User does not exist
            res.send(false);
        }
        else{
            //Password from our DB
            hash = result.data[0].password
            //User data
            firstName = result.data[0].firstName
            lastName = result.data[0].lastName
            username = result.data[0].username

            //Response data to be sent
            user = {
                firstName: firstName, 
                lastName: lastName, 
                username: username,
                loggedIn: true
            }

            req.session.user = user
            // console.log(req.session)
            //Result of the comparison
            result = bcrypt.compareSync(password, hash);
            if (result === true){
                res.status(200).send({
                    data: user
                });
            }
            else{
                res.send(false);
            }
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

//Check if user is logged in.
app.get('/api/login', (req, res) => {
    req.session.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
});

//////////////////////////////
// Order Endpoints
//////////////////////////////
app.post('/api/order', (req, res) => {
    orderModel.create({
        totalPrice: req.body.totalPrice
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
        console.log('Cannot Create Order', err);
    })
})

app.patch('/api/order/:id', (req, res) => {
    orderModel.update({
        totalPrice: req.body.totalPrice
    },{
        where: {
            orderId: req.params.id
        }
    })
    .then(result => {
        if(result[0] === 1){
            res.send({
                status: 200,
                message: `Order ${req.params.id} Updated`
            });
            console.log('Order Updated!');
        }
        else{
            res.json({
                status: 404,
                message: `Order ${req.params.id} Not Found`
            });
            console.log('Order Not Found!');
        }
    })
    .catch(err => {
        res.send('Cannot Update', err);
        console.log('Cannot Update', err);
    })
})

app.get('/api/order', (req, res) => {
    orderModel.findAll()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
        console.log('Cannot find Order',err);
    })
})


app.get('/api/order/:id', (req, res) => {
    orderModel.findAll({
        where: {
            orderId: req.params.id
        }
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
        console.log('Cannot find Order',err);
    })
})

app.delete('/api/order/:id', (req, res) => {
    OrderModel.destroy({
        where: {
            orderId: req.params.id
        }
    })
    .then(result => {
        if(result === 1){
            res.json({
                status: 200,
                message: `Order ${req.params.id} Removed`
            });
            console.log('Order Removed!');
        }
        else{
            res.json({
                status: 404,
                message: `Order ${req.params.id} Not Found`
            })
            console.log('Order Not Found!');
        }
    })
    .catch(err => {
        res.send('Cannot Remove Order', err);
    })
})







//////////////////////////////
// Table Endpoints
//////////////////////////////

userEndpoint(app, userModel);
orderItemEndpoint(app, orderItemModel);
inventoryEndpoint(app, inventoryModel);

// authEndpoint(app, validatePayloadMiddleware, session);

app.listen(PORT, err => { 
    if (err) return console.log(`Cannot Listen on Port: ${PORT}`)
    console.log(`App is running on Port: ${PORT}`)
})