var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    sub: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String
    },
    imagesFolderPath: {
        type: String
    },
    dataFilePath: {
        type: String
    },
    link: {
        type: String
    },
    likes: {
        type: Number,
        required: true
    }
})

module.exports = ContentSchema