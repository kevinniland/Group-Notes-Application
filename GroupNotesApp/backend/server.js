// Global setup
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

// Multer setup
// =======================    
var multer  = require('multer')

// Multer by default doesn't append the extension so to fix this I did some research and found a solution here which I have modified.
// https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
var storageInfo = multer.diskStorage({
    destination: 'uploads/',

    filename: function (req, file, cb) {
        cb(null, file.originalname) // Appending extension
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
        lastName: req.body.lastName,
        profileImage: req.body.profileImage
    })

    res.send("User added");
})

// Get user function
app.get('/api/users', function (req, res) {
    UserModel.find(function (err, data) {
        if (err) {
            res.send(err);
        }

        res.json(data);
    });
})

// Delete user function
app.delete('/api/users/:id', function (req, res) {
    UserModel.deleteOne ({ _id: req.params.id}, 
        function (err, data) {
            if (err) {
                res.send(err);
            }

            res.send(data);
        });
})

// Update user function
app.get('/api/users/:id', function(req, res) {
    UserModel.findById(req.params.id,
        function (err, data) {
            if (err) {
                return handleError(err);
            }
            
            res.json(data);
        })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
  
    console.log("GroupNotesApp listening at http://%s:%s", host, port)
})

app.get('/', function (req, res) {
    res.send('Connected to server');
})

// NOTES STORAGE MONGODB
// =======================================================================

var Schema = mongoose.Schema;
var noteSchema = new Schema({
    groupId : String,
    fileName: String, 
    dateTime: String, 
    text: String
})

var PostModelNotes = mongoose.model('notes', noteSchema);

app.post('/api/notes', function (req, res) {
    PostModelNotes.create ({
        groupId : req.body.groupId,
        fileName: req.body.fileName,
        dateTime: req.body.dateTime,
        text: req.body.text}, 
        
        function (err) {
            if (err){
                return handleError(err);
            }
            else {
                res.send({"msg": "Note Added"});
            }
    });
});

//delete the data from the database using the id
app.delete('/api/notes/:_id', function(req,res){
    PostModelNotes.deleteOne({ _id: req.params._id },

    function (err) {
        if (err){
            res.send({"msg": "Error"});
        }
    });
});

//get all notes for a specific group using the id
app.get('/api/notes/:groupId', function (req, res) {
    PostModelNotes.find({ groupId: req.params.groupId },

    function (err, data) {
        if (err){
            res.send({"msg": "Error"});
        }
        else {
            res.json(data);
        }
    });
});

//get a specific note using the id
app.get('/api/note/:_id', function (req, res) {
    PostModelNotes.findOne({ _id: req.params._id },

    function (err, data) {
        if (err){
            res.send({"msg": "Error"});
        }
        else {
            res.json(data);
        }
    });
});

//update a specific note using the id
app.put('/api/notes/:_id', function(req,res){
    PostModelNotes.findByIdAndUpdate(req.params._id, req.body, function (err, data) {
        if (err){
            return handleError(err);
        }
        else {
            res.send({"msg": "Note Updated"});
        }
    });
});

// GOOGLE CLOUD STORAGE SETUP 
// =======================================================================

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'groupnotesapplication',
    keyFilename: '../../../GroupNotesApplication-9de1bbd9fa82.json'
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

const bucketName = 'groupnotesapp';

//const bucketName2 = '23423432w4dssdf';

// Creates a new bucket
// storage.createBucket(bucketName2, {
// });

// console.log(`Bucket ${bucketName2} created.`);

//-
// Make a bucket's contents publicly readable.
//-
// var myBucket = storage.bucket('23423432w4dssdf');

// var options = {
//   entity: 'allUsers',
//   role: storage.acl.READER_ROLE
// };

// myBucket.acl.add(options, function(err, aclObject) {});
  
// Storage Functions 
// =================================

//Schema for injecting into url schema
var Schema = mongoose.Schema;
var urlListSchema = new Schema({ url: String, fileName: String, type: String });

//create another scheme for the group using the interface variables and pass in the above schema as an array
//to get a nested document
var Schema = mongoose.Schema;
var urlSchema = new Schema({
    groupId : String,
    urlList: [urlListSchema]
})

var PostModelUrl = mongoose.model('storageUrl', urlSchema);

// Create a document for a group which will contain a list of all download links.
app.post('/api/url', function (req, res) {
    PostModelUrl.create ({
        groupId: req.body.groupId,
        urlList: req.body.urlList
    }, 
        
    function (err) {
        if (err){
            return handleError(err);
        }
        else {
            res.send({"msg": "Url List Added"});
        }
    });
});

//get all files for a specific group using the groupId
app.get('/api/url/:groupId', function (req, res) {
    PostModelUrl.find({ groupId: req.params.groupId },

    function (err, data) {
        if (err){
            res.send({"msg": "Error"});
        }
        else {
            res.json(data);
        }
    });
});

//delete the data from the database using the id
app.delete('/api/url/:_id/:fileName/:groupId', function(req,res){

    // From research I learned you could directly remove from an array with Mongoose, so to implement it I found a simple
    // answer to $pull from the array and edited it to my own schema.
    // https://stackoverflow.com/a/27917378
    PostModelUrl.updateOne( {groupId: req.params.groupId}, { $pull: {urlList: {_id: req.params._id} } },

    storage
        .bucket(bucketName)
        .file(req.params.fileName)
        .delete(),
        
    function (err) {
        if (err){
            res.send({"msg": "Error"});
        }
    });
});

// Post method that takes in files through multer and uploaded to Google Cloud and URL to MongoDB
app.post('/api/files', upload.single('fileUpload'), function (req, res, next) {
    console.log(req.file);
    console.log(req.body.groupId);

    // Uploads a local file to the bucket
    storage.bucket(bucketName).upload(req.file.path, {});

    var bucket = storage.bucket(bucketName);                                            
    var file = bucket.file(req.file.originalname); 

    var CONFIG = { action: 'read', expires: '03-01-2500'};   

    file.getSignedUrl(CONFIG, function(err, url) {

        PostModelUrl.findOneAndUpdate({ groupId: req.body.groupId }, 
        { 
            "$push": { "urlList": { url: url, fileName: req.file.originalname, type: req.file.mimetype } }
        }, 
        //{ "new": true, "upsert": true },

        function (err, data) {
            if (err){
                res.send({"msg": "Error"});
            }
            else {
                //res.json(data);
            }
        });
    });
      
    //console.log(`Bucket ${bucketName} created.`);

    //const url = 'https://storage.googleapis.com/' + bucketName + '/' + req.file.originalname;
    //console.log(url); 

    //https://storage.googleapis.com/groupnotesapp/Group%20Project%20Specification.odt
})








