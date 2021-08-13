const { Schema, model } = require('mongoose')

const eco = Schema({
  id: String,
  Expire: Number,
  Permanent: Boolean
})

module.exports = model('whitelisteduser', eco)