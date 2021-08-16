const { Schema, model } = require('mongoose')

const temp = Schema({
    Guild: String,
    User: String,
    Reason: String,
    Start: Date,
    End: Date
})

module.exports = model('tempban', temp)