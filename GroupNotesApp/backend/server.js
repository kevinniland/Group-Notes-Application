//NODEJS SERVER SETUP 
//===============
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//coors setup
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
    
//server setup    
var server = app.listen(8081, function ()  {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
})

//FIREBASE SETUP
//================
var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://groupnotesapp.firebaseio.com"
});

//Database (Users)
var database = firebase.database();

//File Storage (Firebase)
//===============
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


