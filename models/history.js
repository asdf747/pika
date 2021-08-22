const { Schema, model } = require('mongoose')

const eco = Schema({
  Guild: String,
  User: String,
  Cmds: Array
})

module.exports = model('history', eco)