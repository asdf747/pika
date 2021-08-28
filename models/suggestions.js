const { Schema, model } = require('mongoose')


const arnavisgay = Schema({
    Guild: String,
    Suggestions: Array,
    Channel: String
})

module.exports = model('suggestion', arnavisgay)