const { Schema, model } = require('mongoose')

const reactionroles = Schema({
    Guild: String,
    Channel: String,
    Message: String,
    Roles: Array
})

module.exports = model('reactionrole', reactionroles)