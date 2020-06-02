// npm install express body-parser compression  ejs helmet axios cors mongoose --save
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');

var index = require('./routes/index');
var content = require('./routes/content.js');
var login = require('./routes/login.js');
var logout = require('./routes/logout.js');

// auth
// npm install pbkdf2-password express-session --save
var session = require('express-session');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Compress all routes
app.use(compression());
app.use(helmet());
// Set Static folder
app.use(express.static(path.join(__dirname, 'client')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var secretToken = process.env.AUTH_SECRET ? process.env.AUTH_SECRET : ''
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: secretToken
}));

// CORS
const cors = require('cors')
app.use(cors())

app.use('/', index);
app.use('/content', content);
app.use('/login', login);
app.use('/logout', logout);

const port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Ultimate Express server started on port ' + port);
});