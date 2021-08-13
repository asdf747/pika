const mongoose = require('mongoose')
const { MONGODB_SRV } = require('./config.json')
 mongoose.connect(MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to mongodb!"))

