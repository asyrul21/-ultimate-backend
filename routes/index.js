var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Ultimate Portfolio Express Backend');
});

module.exports = router;