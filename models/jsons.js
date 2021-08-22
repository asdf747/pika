const mongoose = require('mongoose')

const jsons = mongoose.Schema({
    ID: String,
    Data: mongoose.Mixed
})

module.exports = mongoose.model('json', jsons)