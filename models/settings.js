const { Schema, model } = require('mongoose')

const settings = Schema({
    id: String,
    Passive: {
        type: Boolean,
        Default: false
    }
})

module.exports = model('setting', settings)