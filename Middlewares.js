var hash = require('pbkdf2-password')()
// define all methods here
function authenticate(name, pass, Admin, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    // find the user
    Admin.findOne({ name: name }, function (err, admin) {
        if (!admin) {
            return fn(new Error('User not found', null))
        }
        // hash the password
        // console.log('We are still hashing the pword');
        hash({ password: pass, salt: admin.salt }, function (err, pass, salt, hash) {
            if (err) return fn(err);
            if (hash === admin.hash) {
                return fn(null, admin)
            }
            // else
            fn(new Error('invalid password'));
        });
    })
}

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.json({
            error: 'Access denied'
        });
    }
}

module.exports = {
    authenticate,
    restrict
}