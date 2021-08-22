const { Schema, model } = require('mongoose')

const eco = Schema({
  id: String,
  reason: String,
  Expire: Number
})

module.exports = model('blacklisteduser', eco)