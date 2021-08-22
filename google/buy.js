const items = require('../shop.json')
const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'buy',
    description: "Buys an item",
    minArgs: 1,
    expectedArgs: '<item> [amount]',
    cooldown: 3,
    callback: async (message, arguments, text, client) => {
        let item = items.find(item => item.ID.includes(arguments[0]))
        if(!item || !item.Shop) return message.channel.send("This item doesn't exist in the shop.")
        let amount = 1
        if(arguments[1] && Number(arguments[1])){
            if(Number(arguments[1]) < 1) return message.channel.send(`You can't buy less than 1 ${item.Name}`)
            if(arguments[1].includes('.')) return message.channel.send("Invalid amount.")
            amount = Number(arguments[1])
        }
        let price = item.Price * amount
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                //checking if user has enough money to buy item
                if(data.Wallet < price) return message.channel.send("You don't have enough money in your wallet.")
                // checking if user already has item
                let checking = data.Inventory.find(iteo => iteo.Name.toLowerCase() === item.Name.toLowerCase())
                if(checking){
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: -price} })
                    await economy.updateOne({ "id": message.author.id, "Inventory.Name": item.Name }, { $inc: {"Inventory.$.Count": amount} })
                    return message.channel.send(
                        new MessageEmbed()
                        .setAuthor(`Bought ${item.Name}`, message.author.displayAvatarURL())
                        .setDescription(`You bought ${amount} **${item.Name}** and paid \`${price.toLocaleString("en-US")}\``)
                        .setColor("GREEN")
                        .setTimestamp()
                    )
                }
                let obj = {
                    Name: item.Name,
                    Count: amount
                }
                data.Inventory.push(obj)
                data.save()
                message.channel.send(
                    new MessageEmbed()
                    .setAuthor(`Bought ${item.Name}`, message.author.displayAvatarURL())
                    .setDescription(`You bought ${amount} **${item.Name}** and paid \`${price.toLocaleString("en-US")}\``)
                    .setColor("GREEN")
                    .setTimestamp()
                )
            }if(!data){
                await new economy({
                    id: message.author.id,
                    Wallet: 500,
                    InBank: 0,
                    Bank: 100
                }).save().then(async (e) => {
                    if(e.Wallet < price) return message.channel.send("You don't have enough money in your wallet.")
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: -price} })
                    let obj = {
                        Name: item.Name,
                        Count: amount
                    }
                    e.Inventory.push(obj)
                    e.save()
                    message.channel.send(
                        new MessageEmbed()
                        .setAuthor(`Bought ${item.Name}`, message.author.displayAvatarURL())
                        .setDescription(`You bought ${amount} **${item.Name}** and paid \`${price.toLocaleString("en-US")}\``)
                        .setColor("GREEN")
                        .setTimestamp()
                    )
                })
            }
        })
    }
}