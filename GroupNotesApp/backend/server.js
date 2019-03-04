// Global setup
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

//Multer setup
// =======================    
var multer  = require('multer')

//Multer by default doesn't append the extension so to fix this I did some research and found a solution here which I have modified.
//https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
var storageInfo = multer.diskStorage({
    dest: 'uploads/',

    filename: function (req, file, cb) {
        cb(null, file.originalname) //Appending extension
    }
  })
  
var upload = multer({ storage: storageInfo });

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

// Google Cloud Storage Setuo 
// ====================================================

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'deft-scout-233120',
    keyFilename: './serviceAccount.json'
});

// Makes an authenticated API request.
storage
  .getBuckets()
  .then((results) => {
      const buckets = results[0];

      console.log('Buckets:');
      buckets.forEach((bucket) => {
          console.log(bucket.name);
      });
  })
  .catch((err) => {
      console.error('ERROR:', err);
  });

const bucketName = 'group_notes_app';

// Storage Functions 
// =================================

app.post('/api/files', upload.single('fileUpload'), function (req, res, next) {
    console.log(req.file);

    // Uploads a local file to the bucket
    storage.bucket(bucketName).upload(req.file.path, {});

    var bucket = storage.bucket(bucketName);                                            
    var file = bucket.file(req.file.originalname); 

    var CONFIG = { action: 'read', expires: '03-01-2500'};   

    file.getSignedUrl(CONFIG, function(err, url) {                                  
        console.log(url);                                                             
    });

    //const url = 'https://storage.googleapis.com/' + bucketName + '/' + req.file.originalname;
    //console.log(url); 
})




