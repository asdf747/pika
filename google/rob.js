const economy = require('../models/economy')
const settings = require('../models/settings')

module.exports = {
    commands: 'rob',
    description: "Robs a person.",
    minArgs: 1,
    cooldown: 120,
    expectedArgs: '<member>',
    callback: async(message, arguments, text, client) => {
        let settingsauthor = settings.findOne({ id: message.author.id }).Passive
        if(settingsauthor) return message.channel.send("You can't rob while in passive mode.")
        let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
        if(!member) return message.channel.send("i can't find this member")
        if(member.user.bot) return message.channel.send("you can't rob bots lol")
        let settingsmember = settings.findOne({ id: member.id }).Passive
        if(settingsmember) return message.channel.send("This member is in passive mode")
        let chances = []
        for (let i = 0; i < 21; i++){
            chances.push('fail')
        }
        for (let i = 0; i < 15; i++){
            chances.push('success')
        }
        let walletmember = economy.findOne({ id: member.id }).Wallet
        let walletauthor = economy.findOne({ id: message.author.id }).Wallet
        if(!walletmember) walletmember = 500
        if(!walletauthor) walletauthor = 500
        if(walletauthor <= 500) return message.channel.send("You need more than 500 coins to rob someone")
        if(walletmember < 500) return message.channel.send("This member doesn't even have 500 coins")
        let putting = walletmember / 2
        let amount = Math.floor(Math.random() * putting) + 1
        let checkingchance = Math.floor(Math.random() * Math.floor(chances.length)) 
        let final = chances[checkingchance]
        switch(final){
            case 'fail':
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: -500} })
                await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: 500} })
                message.channel.send("You got caught and paid the person you stole from **500 coins**")
            case 'success':
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                message.channel.send(`You successfully stole **${amount} coins** from that person`)
        }
    }
}