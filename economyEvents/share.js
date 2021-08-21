const funcs = require('../funcs')

module.exports = async (client, giver, gived, amount) => {
    await funcs.notify(gived, "Share", `${giver.user.tag} gave you **${amount.toLocaleString("en-US")} coins**`)

}