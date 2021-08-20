const { Schema,model } = require('mongoose')

const eco = Schema({
  id: String,
  Wallet: Number,
  InBank: Number,
  Bank: Number,
  Inventory: Array,
  Level: Number,
  RequiredXP: Number,
  XP: Number
})

module.exports = model('economy', eco)