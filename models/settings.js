const { Schema, model } = require('mongoose')

const settings = Schema({
    id: String,
    Passive: String
})

module.exports = model('setting', settings)