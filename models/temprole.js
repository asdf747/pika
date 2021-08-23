const { Schema, model } = require('mongoose')

const temp = Schema({
    Guild: String,
    User: String,
    Role: String,
    Start: Date,
    End: Date
})

module.exports = model('temprole', temp)