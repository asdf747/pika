const { Schema, model } = require('mongoose')

const eco = Schema({
  Guild: String,
  Channel: String,
  IgnoredCount: Number,
  Ignored: Array
})

module.exports = model('reactionlog', eco)