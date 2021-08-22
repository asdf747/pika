const { Schema, model } = require('mongoose')

const ass = Schema({
  Guild: String,
  Hls: Array,
  IgnoredChannels: Array,
  IgnoredUsers: Array
})

module.exports = model('highlight', ass)