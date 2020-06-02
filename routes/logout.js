var express = require('express');
var router = express.Router();

// logout
router.get('/', function (req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function () {
        res.json({
            status: 'Logged out successfully.'
        });
    });
});


module.exports = router;