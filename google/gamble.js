const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['gamble', 'bet'],
    minArgs: 1,
    cooldown: 5,
    expectedArgs: '<amount>',
    callback: async (message, arguments, text, client) => {
        let amount = Number(arguments[0])
        if (!amount && !['all', 'max'].includes(arguments[0].toLowerCase()) && arguments[0].toLowerCase() !== 'half' || amount < 1 && !['all', 'max'].includes(arguments[0].toLowerCase()) && arguments[0].toLowerCase() !== 'half' || arguments[0].includes('.')) return message.channel.send("Enter a valid amount")
        let author_data = await economy.findOne({ id: message.author.id })
        let author_wallet = 500
        if (author_data) author_wallet = author_data.Wallet
        if (author_wallet < 100) return message.channel.send("You need at least **100 coins** to gamble")
        if (amount < 100) return message.channel.send("You need at least **100 coins** to gamble")
        if (amount > author_wallet) return message.channel.send("You don't have that much coins")
        if (amount > 250000) return message.channel.send(`You can't bet more than **250,000 coins**`)
        let betting_amount = amount
        if (['all', 'max'].includes(arguments[0].toLowerCase())) betting_amount = 250000
        if (['all', 'max'].includes(arguments[0].toLowerCase()) && author_wallet < 250000) betting_amount = author_wallet
        if (arguments[0].toLowerCase() === 'half') betting_amount = author_wallet / 2
        if (arguments[0].toLowerCase() === 'half' && author_wallet > 250000) betting_amount = 250000 / 2
        let chances = []
        let winchance = 19
        if (author_data && author_data.Inventory.find(item => item.Name.toLowerCase() === 'trophy') && author_data.Inventory.find(item => item.Name.toLowerCase() === 'trophy').Count >= 1) winchance = 27
        for (let i = 0; i < 21; i++) {
            chances.push('fail')
        }
        for (let i = 0; i < winchance; i++) {
            chances.push('win')
        }
        // picking a random chance
        let checkingchance = Math.floor(Math.random() * Math.floor(chances.length))
        let final = chances[checkingchance]
        // functions for failing and winning
        switch (final) {
            case "win":
                let winamount = betting_amount * 2
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: { Wallet: winamount } })
                let golga = new MessageEmbed()
                    .setTitle(`${message.author.username}${message.author.username.endsWith('s') ? '\'' : '\'s'} gambling game`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setColor("GREEN")
                    .setTimestamp()
                    .setDescription(`You won **${parseInt(winamount).toLocaleString("en-US")} coins**\n\n**Your balance:** ${parseInt(author_wallet + winamount).toLocaleString("en-US")}`)

                if (winchance === 27) golga.setFooter("Luck: x2")
                return message.channel.send(golga)
                break
            case "fail":
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: { Wallet: -betting_amount } })
                let gelga = new MessageEmbed()
                    .setTitle(`${message.author.username}${message.author.username.endsWith('s') ? '\'' : '\'s'} gambling game`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setColor("RED")
                    .setTimestamp()
                    .setDescription(`You lost **${parseInt(betting_amount).toLocaleString("en-US")} coins**\n\n**Your balance:** ${parseInt(author_wallet - betting_amount).toLocaleString("en-US")}`)

                if (winchance === 27) gelga.setFooter("Luck: x2")
                return message.channel.send(gelga)
                break
        }
    }
}