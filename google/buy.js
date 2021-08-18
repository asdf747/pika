const items = require('../shop.json')
const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'buy',
    description: "Buys an item",
    minArgs: 1,
    expectedArgs: '<item> [amount]',
    callback: async (message, arguments, text, client) => {
        let item = items.find(item => item.ID.includes(arguments[0]))
        if(!item) return message.channel.send("This item doesn't exist.")
        let price = item.Price
        let amount = 1
        if(arguments[1] && Number(arguments[1])) amount = Number(arguments[1])
        if(arguments[1] && Number(arguments[1])) price = item.Price * Number(arguments[1])
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                //checking if user has enough money to buy item
                if(data.Wallet < price) return message.channel.send("You don't have enough money in your wallet.")
                // checking if user already has item
                let checking = data.Inventory.find(item => item.Name.toLowerCase() === item.Name.toLowerCase())
                if(checking){
                    return message.channel.send(
                        new MessageEmbed()
                        .setAuthor(`Bought ${item.Name}`, message.author.displayAvatarURL())
                        .setDescription(`You bought ${amount} **${item.Name}** and paid \`${price.toLocaleString("en-US")}\``)
                        .setColor("GREEN")
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
                )
            }if(!data){
                await new economy({
                    id: message.author.id,
                    Wallet: 500,
                    InBank: 0,
                    Bank: 100,
                    Inventory: [
                        {
                            Name: item.Name,
                            Count: amount
                        }
                    ]
                }).save().then(() => {
                    if(500 < price) return message.channel.send("You don't have enough money in your wallet.")
                    message.channel.send(
                        new MessageEmbed()
                        .setAuthor(`Bought ${item.Name}`, message.author.displayAvatarURL())
                        .setDescription(`You bought ${amount} **${item.Name}** and paid \`${price.toLocaleString("en-US")}\``)
                        .setColor("GREEN")
                    )
                })
            }
        })
    }
}