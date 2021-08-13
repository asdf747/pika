const { Schema, model } = require('mongoose')

const eco = Schema({
  Guild: String,
  Locked: Boolean,
  Channels: Array,
  Msg: String,
  UnMsg: String
})

module.exports = model('lockdown', eco)