const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['gamble', 'bet'],
    minArgs: 1,
    cooldown: 5,
    expectedArgs: '<amount>',
    callback: async(message, arguments, text, client) => {
        let amount = Number(arguments[0])
        if(!amount && !['all', 'max'].includes(arguments[0].toLowerCase()) || amount < 1 && !['all', 'max'].includes(arguments[0].toLowerCase()) || arguments[0].includes('.')) return message.channel.send("Enter a valid amount")
        let author_data = await economy.findOne({ id: message.author.id })
        let author_wallet = 500
        if(author_data) author_wallet = author_data.Wallet
        if(author_wallet < 100) return message.channel.send("You need at least **100 coins** to gamble")
        let betting_amount = amount
        if(['all', 'max'].includes(arguments[0].toLowerCase())) betting_amount = 250000
        if(['all', 'max'].includes(arguments[0].toLowerCase()) && author_wallet < 250000) betting_amount = author_wallet
        let chances = []
        for (let i = 0; i < 21; i++){
            chances.push('fail')
        }
        for (let i = 0; i < 19; i++){
            chances.push('win')
        }
        // picking a random chance
        let checkingchance = Math.floor(Math.random() * Math.floor(chances.length)) 
        let final = chances[checkingchance]
        // functions for failing and winning
        switch(final){
            case "win":
                let winamount = betting_amount * 2
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: winamount} })
                return message.channel.send(
                    new MessageEmbed()
                    .setTitle(`${message.author.username}${message.author.username.endsWith('s') ? '\'' : '\'s'} gambling game`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setColor("GREEN")
                    .setTimestamp()
                    .setDescription(`You won **${parseInt(winamount).toLocaleString("en-US")} coins**\n\n**Your balance:** ${parseInt(author_wallet + winamount).toLocaleString("en-US")}`)
                )
                break
            case "fail":
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: -betting_amount} })
                return message.channel.send(
                    new MessageEmbed()
                    .setTitle(`${message.author.username}${message.author.username.endsWith('s') ? '\'' : '\'s'} gambling game`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setColor("RED")
                    .setTimestamp()
                    .setDescription(`You lost **${parseInt(betting_amount).toLocaleString("en-US")} coins**\n\n**Your balance:** ${parseInt(author_wallet - betting_amount).toLocaleString("en-US")}`)
                )
                break
        }
    }
}