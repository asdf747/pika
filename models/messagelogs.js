const { Schema, model } = require('mongoose')

const eco = Schema({
  Guild: String,
  Channel: String
})

module.exports = model('message-log', eco)