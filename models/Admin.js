var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
})

module.exports = AdminSchema