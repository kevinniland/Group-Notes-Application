//NODEJS SERVER SETUP 
//===============
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
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
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

//FIREBASE SETUP (Storage)
//================
var firebase = require("firebase");

var config = {
  apiKey: 'AIzaSyCEQtQ7Pu_BlxZxkW8ssimqRjHIyySkOnM',
  authDomain: 'groupnotesapp.firebaseapp.com',
  databaseURL: 'https://groupnotesapp.firebaseio.com',
  storageBucket: 'gs://groupnotesapp.appspot.com'
};

firebase.initializeApp(config);

// Get a reference to the storage service, which is used to create references in the storage bucket
var storage = firebase.storage();

// Create a storage reference
var storageRef = storage.ref();
var testRef = storageRef.child('test.jpg');

// Create a reference to 'images/test.jpg'
var testImagesRef = storageRef.child('images/test.jpg');

//var file =  // use the Blob or File API

//POST method which console logs data passed up to the server
app.post('/api/files', function (req, res) {

  testImagesRef.put(req).then(function(snapshot) {
    console.log('Uploaded File!');
  });

  //res.status(201).json({message: "Image Uploaded"});
})




