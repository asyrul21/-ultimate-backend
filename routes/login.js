var express = require('express');
var router = express.Router();
// auth
var hash = require('pbkdf2-password')()
// methods
var { authenticate, restrict } = require('../Middlewares')

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
// ************** mongoose schemas **************
// **********************************************
var AdminSchema = require('../models/Admin');
// connect to db collection
var Admin = mongoose.model('Admin', AdminSchema);


// login
router.post('/', function (req, res, next) {
    var details = req.body
    // authenticate
    authenticate(details.name, details.password, Admin, function (err, admin) {
        if (admin) {
            // Regenerate session when signing in
            // to prevent fixation
            req.session.regenerate(function () {
                req.session.user = admin;
                req.session.success = 'Authenticated as ' + admin.name;
                console.log(req.session.success);
                res.json({
                    status: 'Login successful',
                    admin: {
                        name: admin.name
                    }
                });
            });
        } else {
            req.session.error = 'Authentication failed, please check your '
                + ' username and password.';
            res.status(500).json({ error: 'Authentication failed.' })
        }
    })
});

// check logged in
router.get('/check', function (req, res) {
    console.log('Checking if user has logged in...');
    if (req.session.user) {
        res.json({
            loggedIn: true
        })
    } else {
        res.json({
            loggedIn: false
        })
    }
})

// register new admin
router.post('/register', restrict, function (req, res, next) {
    var details = req.body // name and password

    console.log('Details:', details);

    hash({ password: details.password }, function (err, pass, salt, hash) {
        if (err) {
            res.send(err);
        }

        //  create new admin instance using hashed password
        var newAdmin = new Admin({
            name: details.name,
            salt: salt,
            hash: hash
        })

        // save admin into db
        newAdmin.save(function (err, admin) {
            if (err) {
                res.send(err);
            } else {
                // return saved admin
                res.json({
                    'Status': 'Success',
                    'adminSaved': admin
                });
            }
        })
    });
});


module.exports = router;