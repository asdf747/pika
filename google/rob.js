const economy = require('../models/economy')
const settings = require('../models/settings')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://lol:fofo29112007@golgo.t3bmd.mongodb.net/gg?retryWrites=true&w=majority");
const moment = require('moment')

module.exports = {
    commands: 'rob',
    description: "Robs a person.",
    minArgs: 1,
    cooldown: 120,
    expectedArgs: '<member>',
    callback: async(message, arguments, text, client) => {
        let unlucky = await db.fetch(`unlucky_${message.author.id}`)
        if(unlucky !== null){
            let dur = moment.duration(Date.now() - unlucky).as('minutes')
            if(dur < 15) return message.channel.send("someone used the unlucky cookie on you so you can't rob or join heists lol")
        }
        let egg = await settings.findOne({ id: message.author.id })
        let settingsauthor = 'false'
        if(egg) settingsauthor = egg.Passive
        if(settingsauthor === 'true') return message.channel.send("You can't rob while in passive mode.")
        let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
        if(!member) return message.channel.send("i can't find this member")
        if(member.user.bot) return message.channel.send("YOU CAN'T ROB BOTS LEAVE THEM ALONE PLEASE")
        if(member.id === message.author.id) return message.channel.send("Why tf would you rob yourself")
        if(member.user.bot) return message.channel.send("you can't rob bots lol")
        let og = await settings.findOne({ id: member.id })
        let settingsmember = 'false'
        if(og) settingsmember = og.Passive
        if(settingsmember === 'true') return message.channel.send("This member is in passive mode")
        let chances = []
        for (let i = 0; i < 21; i++){
            chances.push('fail')
        }
        for (let i = 0; i < 15; i++){
            chances.push('success')
        }
        let walletmembe = await economy.findOne({ id: member.id })
        let walletautho = await economy.findOne({ id: message.author.id })
        let walletmember = 500
        let walletauthor = 500
        if(walletmembe) walletmember = walletmembe.Wallet
        if(walletautho) walletauthor = walletautho.Wallet
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
                return message.channel.send("You got caught and paid the person you stole from **500 coins**")
            case 'success':
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: -amount} })
                return message.channel.send(`You successfully stole **${parseInt(amount).toLocaleString("en-US")} coins** from that person`)
        }
    }
}