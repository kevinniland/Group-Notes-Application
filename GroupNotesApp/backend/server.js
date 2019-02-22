var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// NodeJS Server Setup
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

// Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Coors setup
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
    
// Server setup    
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("GroupNotesApp listening at http://%s:%s", host, port)
})

// Firebase Server Setup
var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://groupnotesapp.firebaseio.com"
});

var database = firebase.database();

var Schema = database.Schema;

var userSchema = new Schema ({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    profileImage: String
})

var UserModel = database.model('users', userSchema);

// Here we are configuring express to use body-parser as middle-ware 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });


app.get('/', function (req, res) {
    res.send('Connected to server');
})

app.post('/api/users', function (req, res) {
    UserModel.create ({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImage: req.body.profileImage
    })

    res.send("User added");
})

app.get('/api/users', function (req, res) {
    UserModel.find(function (err, data) {
        if (err) {
            res.send(err);
        }

        res.json(data);
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("GroupNotesApp listening at http://%s:%s", host, port)
 })
