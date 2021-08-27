const { Schema, model } = require('mongoose')

const plsbeg = Schema({
  Guild: String,
  Ars: Array
})

module.exports = model('ar', plsbeg)