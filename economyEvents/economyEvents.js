const funcs = require('./funcs')

client.economy.on('share', async function (giver, gived, amount){
    await funcs.notify(gived, "Share", `${giver.user.tag} gave you **${amount.toLocaleString("en-US")} coins**`)
})