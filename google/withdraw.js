const economy = require('../models/economy')

module.exports = {
    commands: ['withdraw', 'with'],
    minArgs: 1,
    expectedArgs: '<amount>',
    callback: async (message, arguments, text, client) => {
        if(['all', 'max'].includes(arguments[0].toLowerCase())){
            await economy.findOne({ id: message.author.id }, async(err, data) => {
                if(data){
                    if(data.InBank <= 0) return message.channel.send("You don't have anything to withdraw.")
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: data.InBank, InBank: -data.InBank} })
                    return message.channel.send(`Withdrawed **${parseInt(data.InBank).toLocaleString('en-US')}** now you have **${parseInt(data.Wallet + data.InBank).toLocaleString('en-Us')}** in your wallet.`)
                }if(!data){
                    return message.channel.send("You don't have anything to withdraw.")
                }
            })
            return
        }
        let amount = Number(arguments[0])
        if(!amount || arguments[0].includes('.')) return message.channel.send("Enter a valid amount")
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                if(amount > data.InBank) return message.channel.send("You don't have that much in your bank")
                if(data.Bank <= 0) return message.channel.send("You don't have anything to withdraw.")
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount, InBank: -amount} })
                return message.channel.send(`Withdrawed **${parseInt(data.InBank).toLocaleString('en-US')}** now you have **${parseInt(data.Wallet + data.InBank).toLocaleString('en-Us')}** in your wallet.`)
            }if(!data){
                return message.channel.send("You don't have anything to withdraw.")
            }
        })
    }
}