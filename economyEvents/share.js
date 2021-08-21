const funcs = require('../funcs')
const EventEmitter = require('events')
const e = new EventEmitter()


e.on('share', async function (giver, gived, amount){
    await funcs.notify(gived, "Share", `${giver.user.tag} gave you **${amount.toLocaleString("en-US")} coins**`)
})
    

