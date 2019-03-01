// Global setup
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

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
    
// Firebase Server Setup
// =======================    
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'groupnotesapp',
      clientEmail: 'firebase-adminsdk-3ebox@groupnotesapp.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNMPafcYySN/q4\n9hiJgeYS/7YEcBDsuk/1G7uh257DfdRFIkKhCKavtPbeC8Xiu6N9pvtdaJ//MIcD\nZgRkGTzVop3SEqxkizxPV6mSgWJZ2NQgn+aulHBQcN9SRInDknKxSqp+YVeGXu8R\nI7CWUSPfou9HIuR1HN4zlwEDZnm1RD2mPTHFyMbcqonWrdabPsD0b99om6+na8UV\nV49od+iTJPvki3rvO2qOjc4efhI+vL2ID4dKklgmi80cRz8pXmIMAd7uf1vxKQXy\nbp1YxV5FgPtrHxuv4ZgFI1p2lZYSoTQZj6HsBfxMnZw5rVnZbaPh/8v+DJcw4+/m\nCFt3pplXAgMBAAECggEAMS0DZioF+QMOhSaBse7eT35WRpD/FWT/haw8Vym1zn9J\nELqJwmM645BYu9WReuniYFpVEslg0v1z1hYshjrgMAkVjsOn6j7OWOuW+cQlaIgF\nKr53wC5WDolGlEZVx/fAognVe41jtxHodLCbgSL4GIBJnUBZBVJCVJXjiceU8qJ2\ngHmtlCtBevTCftJ57AfBlakHSRZLJEMXiCnogP7JNAFqxcMZaDwK+txxjZ/XgUUP\n6/0u1ISJlvW5Gs56DdksnK5Wz52+ryca6seafT/0F2NJvmCXgYMt8tT+/rkqunjV\nl2iZ97xWUaQvd7c6RNGU6oPmI5qFg5lAO0s+byysWQKBgQD3X/4QwShGzx/FTeps\nsQQgs+IzEBIVn4kTOTQ/fZK94di2rovA0wyOoNQC7CeKmVTxhLJGL7/bLND//qGF\nfsOla7uIjS9TTKpkOwk4fAoURsFhb5ylBuYY6P7z4XXoOv4rmRqCN5ZRFMg2Slfp\nJ9xQEAYGM6w5VuYl3rZ7BL/NiQKBgQDUWHMbBcVEri5SFu6DLaOCEVucnY3kimuX\n4iD4dXK4X/jhVgMhdvPxY0Z4v0K/uqZsMt/FeUTS5UkhjV4PluECsqDSRPnW/11r\n3+P728Es8dugHcfqVyZ8WNlBzvVDAiTBe6/Z4fRNCOaNFBngNeS3pErqIyFDXzLa\ncOFvOrFX3wKBgGNBqPegCUEgKmdIdB9Yh4d3pfNHJ3p1oNKNyWEQSajWzdW/A2RD\nSm6QKYFisBr0mxitXbq7vgd7XADbcoPV8TqWl5Ca1bpesJ+28GQxoPmxyjYGSpwM\nwJaOJn5EoMKlqQZlUDWfiDjQVeUyv0NWMxgM1d33Lct0CrR3QFDr/unBAoGBAIzZ\niqhfAIXY/5Kl8VmD2VQ6TUkqXOc+RbX+YZ5M0WapCj31vqfg7lisYB9RxmXE2gUl\nDbdABD3bptGhosW2b9RJRlGTPSG2S3J1lRUHpDA60VJ4zpWLb1TF3n4/WAI1lsnc\nUD23GkRK5hqoPa2yMd76FFMQME0vBV1NyMrt5JqDAoGAOUNXty2XkReWR+IhUFla\n8H3QuwQh7/6UQNj1GwroclJhzKSD1qlP0RqgMEukYry0HdzzaSqJwevG/QWSijiO\nPoMUiC6NSb40TEZpDBfEDymq8f2lgwlgASmVmZo3DOkqmSPeJrohBCs33pmyiulp\nmSDRcHrJ6gHiuSa4MRDtQBg=\n-----END PRIVATE KEY-----\n'
    }),
    databaseURL: 'https://groupnotesapp.firebaseio.com'
  });

var database = admin.database();

// ===================================================================================================

// Mongoose Server Setup
// ==========================
var mongoose = require('mongoose');
var mongoDB = 'mongodb://kn_ms:GroupNotesApp19@ds155845.mlab.com:55845/group_notes_app-users';

mongoose.connect(mongoDB);

var Schema = mongoose.Schema;

var userSchema = new Schema ({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    profileImage: String
})

var UserModel = mongoose.model('users', userSchema);

app.post('/api/users', function (req, res) {
    UserModel.create ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
        // profileImage: req.body.profileImage
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

app.get('/', function (req, res) {
    res.send('Connected to server');
})

//FIREBASE SETUP (Storage)
//================
// var firebase = require("firebase");

// var config = {
//   apiKey: 'AIzaSyCEQtQ7Pu_BlxZxkW8ssimqRjHIyySkOnM',
//   authDomain: 'groupnotesapp.firebaseapp.com',
//   databaseURL: 'https://groupnotesapp.firebaseio.com',
//   storageBucket: 'gs://groupnotesapp.appspot.com'
// };

// firebase.initializeApp(config);

// // Get a reference to the storage service, which is used to create references in the storage bucket
// var storage = firebase.storage();

// // Create a storage reference
// var storageRef = storage.ref();
// var testRef = storageRef.child('test.jpg');

// // Create a reference to 'images/test.jpg'
// var testImagesRef = storageRef.child('images/test.jpg');

// //var file =  // use the Blob or File API

//POST method which console logs data passed up to the server
// app.post('/api/files', function (req, res) {

//     console.log(req);
//     console.log("Hello");
//     //console.log(req.json);
//     //console.log(res);
// //   testImagesRef.put(req).then(function(snapshot) {
// //     console.log('Uploaded File!');
// //   }); 

//     //res.send('File Uploaded');

//   //res.status(201).json({message: "Image Uploaded"});
// })

app.post('/api/files', upload.single('fileUpload'), function (req, res, next) {
    console.log(req.file);
})




