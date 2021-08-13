const { Schema, model } = require("mongoose")

const ass = Schema({
  Guild: String,
  User: String,
  Amount: Number,
  Donations: Array,
})

module.exports = model('Donation', ass)