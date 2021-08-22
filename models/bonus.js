const { Schema, model } = require('mongoose')

const eco = Schema({
  Guild: String,
  Roles: Array
})

module.exports = model('bonus', eco)