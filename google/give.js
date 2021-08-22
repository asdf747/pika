const economy = require('../models/economy')
const { notify } = require('../funcs')

module.exports = {
    commands: ['share', 'give'],
    minArgs: 2,
    description: "Give a member coins",
    expectedArgs: "<amount> <member>",
    cooldown: 5,
    callback: async (message, arguments, text, client) => {
        let amount = Number(arguments[0])
        if(!amount && !['all'].includes(arguments[0].toLowerCase()) || arguments[0].includes('.') && !['all'].includes(arguments[0].toLowerCase()) || amount < 1 && !['all'].includes(arguments[0].toLowerCase())) return message.channel.send("enter a valid amount when")
        let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[1])
        if(!member) return message.channel.send("mention a valid member lol")
        await economy.findOne({ id: message.author.id }, async (err, data) => {
            let clocklo = await economy.findOne({ id: member.id })
            let member_wallet = 500
            if(clocklo) member_wallet = clocklo.Wallet
            if(data){
                if(arguments[0].toLowerCase() === 'all') amount = data.Wallet
                if(amount === 0) return message.channel.send("you can't give 0 coins")
                if(data.Wallet < amount) return message.channel.send("you don't even have that much in your wallet")
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: -amount} })
                await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: amount} })
                await client.economy.emit('share', message.member, member, amount)
                message.lineReply(`You gave ${member.user.username} **${amount.toLocaleString("en-US")}**, Now they have **${parseInt(member_wallet + amount).toLocaleString("en-US")}**`)
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
                await client.economy.emit('share', message.member, member, amount)
                message.lineReply(`You gave ${member.user.username} **${amount.toLocaleString("en-US")}**, Now they have **${parseInt(member_wallet + amount).toLocaleString("en-US")}**`)
                })
            }
        })
    }
}