// Global setup
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
// Used to remove upload file from the filesystem
var fs = require('fs');

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

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
  
    console.log("GroupNotesApp listening at http://%s:%s", host, port)
})

app.get('/', function (req, res) {
    res.send('Connected to server');
})
    
// Mongoose Server Setup
// ==========================
var mongoose = require('mongoose');
var mongoDB = 'mongodb://kn_ms:GroupNotesApp19@ds155845.mlab.com:55845/group_notes_app-users';

mongoose.connect(mongoDB);

// Notes Storage - MongoDB
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

// Delete the data from the database using the id
app.delete('/api/notes/:_id', function(req,res){
    PostModelNotes.deleteOne({ _id: req.params._id },

    function (err) {
        if (err){
            res.send({"msg": "Error"});
        }
    });
});

// Get all notes for a specific group using the id
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

// Get a specific note using the id
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

// Update a specific note using the id
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

// Google Cloud Storage Setup
// =======================================================================

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'groupnotesapplication',
    keyFilename: '../../../GroupNotesApplication-9de1bbd9fa82.json'
});
  
// Storage Functions 
// =================================

// Schema for injecting into url schema
var Schema = mongoose.Schema;
var urlListSchema = new Schema({ url: String, fileName: String, type: String });

// Create another scheme for the group using the interface variables and pass in the above schema as an array
// to get a nested document
var Schema = mongoose.Schema;
var urlSchema = new Schema({
    groupId : String,
    urlList: [urlListSchema]
})

var PostModelUrl = mongoose.model('storageUrl', urlSchema);

// Create an initial document for a group which will contain a list of all download links.
app.post('/api/url', function (req, res) {
    PostModelUrl.create ({
        groupId: req.body.groupId,
        urlList: req.body.urlList
    }, 
        
    function (err, data) {
        // Create a google Cloud storage bucket
        storage.createBucket(req.body.groupId, {});

        if (err){
            return handleError(err);
        }
        else {
            res.send({"msg": "Url List Added"});
        }
    });
});

// Get all download url files for a specific group using the groupId
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

// Delete the data from the database using the id
app.delete('/api/url/:_id/:fileName/:groupId', function(req,res){

    // From research I learned you could directly remove from an array with Mongoose, so to implement it I found a simple
    // answer to $pull from the array and edited it to my own schema.
    // https://stackoverflow.com/a/27917378
    PostModelUrl.updateOne( {groupId: req.params.groupId}, { $pull: {urlList: {_id: req.params._id} } },

    // Delete file from the storage bucket
    storage
        .bucket(req.params.groupId)
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

    // The uploade file is stored locally and then uploaded to the storage bucket on Google Cloud
    storage.bucket(req.params.groupId).upload(req.file.path, {});

    // Get the bucket, and file from storage
    var bucket = storage.bucket(req.params.groupId);                                            
    var file = bucket.file(req.file.originalname); 

    // Set up configuration so the signed url doesn't expire
    var CONFIG = { action: 'read', expires: '03-01-2500'};   

    // Get the signed url for the file, which will serve as a unique download link to the file
    file.getSignedUrl(CONFIG, function(err, url) {

        // Update download list url's by pushing new url into existing array
        PostModelUrl.findOneAndUpdate({ groupId: req.body.groupId }, 
        { 
            "$push": { "urlList": { url: url, fileName: req.file.originalname, type: req.file.mimetype } }
        },

        function (err, data) {
            if (err){
                res.send({"msg": "Error"});
            }
            else {
                // Remove file from uploads folder for security. It would stop the server crashing if under attack by multiple uploads.
                fs.unlinkSync(req.file.path);
            }
        });
    });
})










