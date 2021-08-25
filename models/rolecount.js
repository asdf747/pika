const { Schema, model } = require('mongoose')

const ass = Schema({
    Guild: String,
    Message: String,
    Channel: String,
    Roles: Array
})

module.exports = model('rolecount', ass)