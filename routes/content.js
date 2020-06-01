var express = require('express');
var router = express.Router();
var path = require('path');

// **********************************************
// ************ mongoose connection *************
// **********************************************
// https://mongoosejs.com/docs/index.html
var mongoose = require('mongoose');
// user credentials
var mongoUser = process.env.MONGO_USR ? process.env.MONGO_USR : ''
var mongoPw = process.env.MONGO_PW ? process.env.MONGO_PW : ''
// connect
mongoose.connect(`mongodb://${mongoUser}:${mongoPw}@ds113003.mlab.com:13003/ultimate-portfolio-content`, { useNewUrlParser: true, useUnifiedTopology: true });
// test connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection to MongoDB established!');
});

// **********************************************
// ************** mongoose schema ***************
// **********************************************
var ContentSchema = require('../models/Content');
// connect to db collection
var Content = mongoose.model('Content', ContentSchema);

// Get All contents
router.get('/', function (req, res, next) {
    Content.find(function (err, docs) {
        if (err) {
            res.send(err);
        }
        res.json(docs);
    });
});

// insert content
router.post('/', function (req, res, next) {
    var content = req.body

    // new content instance
    var newContent = new Content(content)

    // save content
    newContent.save(function (err, content) {
        if (err) {
            res.send(err);
        } else {
            // return saved Content
            res.json({
                'Status': 'Success',
                'contentSaved': content
            });
        }
    })
});

// req.query
// req.param
// req.body

// update
router.put('/:key/edit', function (req, res, next) {
    // new content instance
    var updatedContent = req.body

    // create query
    var query = {
        key: req.params.key
    }
    // { key: 'transform'}

    console.log('Query:', query);
    console.log('Updated:', updatedContent);

    // save content
    Content.updateOne(query, updatedContent, function (err, content) {
        if (err || !query.key) {
            res.send(err);
        } else {
            // return saved Content
            res.json({
                'Status': 'Success',
                'contentUpdated': content
            });
        }
    })
});

// delete
router.delete('/:key', function (req, res, next) {
    // create query
    var query = {
        key: req.params.key
    }

    console.log('Query:', query);

    Content.deleteOne(query, function (err, content) {
        if (err || !query.key) {
            res.send(err);
        } else {
            // return saved Content
            res.json({
                'Status': 'Success'
            });
        }
    })
})


module.exports = router;