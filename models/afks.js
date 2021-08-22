const { Schema, model } = require('mongoose')

const eco = Schema({
  Guild: String,
  Afks: Array
})
module.exports = model('afk', eco)