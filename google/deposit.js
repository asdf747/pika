const economy = require('../models/economy')
const db = require('quick.db')

module.exports = {
    commands: ['deposit', 'dep'],
    minArgs: 1,
    expectedArgs: '<amount>',
    cooldown: 3,
    callback: async(message, arguments, text, client) => {
        let inheist = await db.fetch(`inheist_${message.author.id}`)
        if(inheist !== null && inheist === true) return message.channel.send("You can't use this command while in heist.")
        if(!Number(arguments[0]) && !['all', 'max'].includes(arguments[0].toLowerCase())) return message.channel.send("Enter a valid amount.")
        
        await economy.findOne({ id: message.author.id }, async (err, data) => {
            if(data){
                if(data.Wallet <= 0) return message.channel.send("There is nothing to deposit.")
                if(['all', 'max'].includes(arguments[0].toLowerCase())){
                if(data.Wallet >= data.Bank){
                    removing = data.Bank - data.InBank
                    if(removing <= 0) return message.channel.send("Your bank is full.")
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {
                        Wallet: -removing,
                        InBank: removing
                    } })
                    return message.channel.send(`Deposited **${Number(removing).toLocaleString("en-US")}** now your bank balance is **${data.InBank + removing}**.`)
                }if(data.Wallet < data.Bank){
                    goving = data.Bank - data.InBank
                    if(goving <= 0) return message.channel.send("Your bank is full.")
                    removing = data.Bank - data.InBank
                    gosa = data.Bank - data.InBank - data.Wallet
                    if(removing > data.Wallet) removing = data.Wallet
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {
                        Wallet: -removing,
                        InBank: removing
                    } })
                    return message.channel.send(`Deposited **${Number(removing).toLocaleString("en-US")}** now your bank balance is **${data.InBank + removing}**.`)
                }
                return;
                }
                let pp = data.Bank - data.InBank
                let amount = Number(arguments[0])
                if(!amount || arguments[0].includes('.')) return message.channel.send("Enter a valid amount.")
                if(amount > data.Wallet) return message.channel.send("You don't have this much in your wallet.")
                if(amount > pp) return message.channel.send("You can't deposit this amount.")
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: -amount, InBank: amount} })
                return message.channel.send(`Deposited **${Number(amount).toLocaleString("en-US")}** now your bank balance is **${data.InBank + amount}**.`)
                
            }if(!data){
                await new economy({
                    id: message.author.id,
                    Wallet: 500,
                    InBank: 0,
                    Bank: 100
                }).save().then(async (gg) => {
                    let pp = gg.Bank - gg.InBank
                    let amount = Number(arguments[0])
                    if(!amount) return message.channel.send("Enter a valid amount.")
                    if(amount > gg.Wallet) return message.channel.send("You don't have this much in your wallet.")
                    if(amount > pp) return message.channel.send("You can't deposit this amount.")
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {
                        Wallet: -amount,
                        InBank: amount
                    } })
                    return message.channel.send(`Deposited **${Number(amount).toLocaleString("en-US")}** now your bank balance is **${data.InBank + amount}**.`)
                })
            }
        })
    }
}