const { Schema, model } = require('mongoose')


const eco = Schema({
  Guild: String,
  IgnoredChannels: Array,
  Words: Array
})

module.exports = model('blacklisted-word', eco)

