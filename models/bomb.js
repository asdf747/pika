const { Schema, model } = require('mongoose')

const eco = Schema({
  Guild: String,
  Bombs: Array
})

module.exports = model('bomb', eco)