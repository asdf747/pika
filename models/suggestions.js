const { Schema, model } = require('mognoose')


const arnavisgay = Schema({
    Guild: String,
    Suggestions: Array,
    Channel: String
})

module.exports = model('suggestion', arnavisgay)