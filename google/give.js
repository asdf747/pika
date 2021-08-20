const economy = require('../models/economy')

module.exports = {
    commands: ['share', 'give'],
    minArgs: 2,
    expectedArgs: "<amount> <member>",
    cooldown: 5,
    callback: async (message, arguments, text, client) => {
        let amount = Number(arguments[0])
        if(!amount || arguments[0].includes('.')) return message.channel.send("enter a valid amount when")
        let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[1])
        if(!member) return message.channel.send("mention a valid member lol")
        await economy.findOne({ id: message.guild.id }, async (err, data) => {
            if(data){
                if(data.Wallet < amount) return message.channel.send("you don't even have that much in your wallet")
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: -amount} })
                await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: amount} })
                message.lineReply(`You gave ${member.user.username} **${amount.toLocaleString("en-US")}**`)
            }if(!data){
                await new economy({
                    id: message.author.id,
                    Wallet: 500,
                    Bank: 100,
                    InBank: 0
                }).save().then(async (ass) => {
                    if(ass.Wallet < amount) return message.channel.send("you don't even have that much in your wallet")
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: -amount} })
                await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: amount} })
                message.lineReply(`You gave ${member.user.username} **${amount.toLocaleString("en-US")}**`)
                })
            }
        })
    }
}