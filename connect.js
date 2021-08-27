let URL = ''

async function connect(url) {
    const mongoose = require('mongoose')
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        keepAlive: true
    })
        .then(() => console.log(`Connected to mongodb!`))
        .catch(err => console.log(err))
    URL = url
}

async function fetch(){
    let ass = URL
    if(!URL.length) ass = 'Unknown URL'
    console.log(ass)
}

module.exports = {
    connect,
    fetch
}