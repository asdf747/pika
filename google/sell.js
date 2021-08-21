const items = require('../shop.json')
const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'sell',
    minArgs: 1,
    description: "Sells an item",
    cooldown: 3,
    expectedArgs: '<item> [amount]',
    callback: async(message, arguments, text, client) => {
        let item = items.find(item => item.ID.includes(arguments[0].toLowerCase()))
        if(!item) return message.channel.send("This item doesn't exist.")
        let doc = await economy.findOne({ id: message.author.id })
        if(!doc) return message.channel.send("You don't own this item.")
        if(!doc.Inventory.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase()) || doc.Inventory.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase()).Count < 1) return message.channel.send("You don't own this item.")
        if(item.Sell === "???") return message.channel.send("You can't sell this item")
        let amount = 1
        if(arguments[1] && Number(arguments[1]) && !arguments[1].includes('.') && Number(arguments[1]) >= 1) amount = Number(arguments[1])
        if(arguments[1] && arguments[1].toLowerCase() === 'all') amount = doc.Inventory.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase()).Count
        let money = item.Sell * amount
        if(doc.Inventory.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase()).Count < amount) return message.channel.send(`You don't have this many of **${item.Name}**`)
        await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: money} })
        await economy.updateOne({ "id": message.author.id, "Inventory.Name": item.Name }, { $inc: {"Inventory.$.Count": -amount} })
        message.channel.send(
            new MessageEmbed()
            .setTitle("Sold item.")
            .setColor("GREEN")
            .setDescription(`You sold **${amount.toLocaleString("en-US")} ${item.Name}** for \`${parseInt(money).toLocaleString("en-US")}\``)
        )
    }
}