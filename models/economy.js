const { Schema,model } = require('mongoose')

const eco = Schema({
  id: String,
  Wallet: Number,
  InBank: Number,
  Bank: Number,
  Inventory: Array,
  Notifications: Array
})

module.exports = model('economy', eco)