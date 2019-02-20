var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://groupnotesapp.firebaseio.com"
});

//Database
var database = firebase.database();


//File Storage
//===============
var storage = firebase.storage();

// Create a storage reference
var storageRef = storage.ref();
var testRef = storageRef.child('test.jpg');

// Create a reference to 'images/test.jpg'
var testImagesRef = storageRef.child('images/test.jpg');

var file =  // use the Blob or File API

testImagesRef.put(file).then(function(snapshot) {
  console.log('Uploaded File!');
});
