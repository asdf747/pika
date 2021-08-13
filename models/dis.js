const { Schema, model } = require('mongoose')

const eco = Schema({
  Guild: String,
  Cmds: Array
})
module.exports = model('dis', eco)
