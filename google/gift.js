const items = require('../shop.json')
const economy = require('../models/economy')

module.exports = {
    commands: 'gift',
    expectedArgs: '<amount> <item> <user>',
    minArgs: 3,
    description: "Gift a member an item",
    cooldown: 10,
    callback: async(message, arguments, text, client) => {
        let amount = Number(arguments[0])
        // checking if amount is a valid number and not less than 1
        if(!amount || amount < 1 || arguments[0].includes('.')) return message.channel.send("enter a valid amount when")
        let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[2])
        // checking if member exists
        if(!member) return message.channel.send("does that user even exist in this server")
        let item = items.find(item => item.ID.includes(arguments[1].toLowerCase()))
        // checking if item exists
        if(!item) return message.channel.send("that item doesn't even exist")
        // checking if user has the item in his inventory
        let author_economy = await economy.findOne({ id: message.author.id })
        let author_inventory = false
        if(author_economy) author_inventory = author_economy.Inventory.find(thing => thing.Name.toLowerCase() === item.Name.toLowerCase())
        if(!author_inventory || author_inventory.Count < 1) return message.channel.send("you don't own this item")
        if(author_inventory.Count < amount) return message.channel.send("you don't have that much of this item")
        // calling the database
        await economy.findOne({ id: member.id }, async (err, data) => {
            if(data){
                // checking if item already exists in the member's inventory
                let checking_item = await data.Inventory.find(thing => thing.Name.toLowerCase() === item.Name.toLowerCase())
                if(checking_item){
                    if(item.Max && checking_item.Count >= item.Max) return message.lineReply(`${member.user.username} already has **${parseInt(checking_item.Count).toLocaleString("en-Us")}** of this item he can't have more than this`)
                    await economy.updateOne({ "id": message.author.id, "Inventory.Name": item.Name }, { $inc: {"Inventory.$.Count": -amount} })
                    await economy.updateOne({ "id": member.id, "Inventory.Name": item.Name }, { $inc: {"Inventory.$.Count": amount} })
                    return message.lineReply(`You gave ${member.user.username} **${amount.toLocaleString("en-Us")} ${item.Name}**, Now they have **${parseInt(checking_item.Count + amount).toLocaleString("en-Us")}**`)
                }
                let obj = {
                    Name: item.Name,
                    Count: amount
                }
                data.Inventory.push(obj)
                data.save()
                await economy.updateOne({ "id": message.author.id, "Inventory.Name": item.Name }, { $inc: {"Inventory.$.Count": -amount} })
                return message.lineReply(`You gave ${member.user.username} **${amount.toLocaleString("en-Us")} ${item.Name}**, Now they have **${parseInt(amount).toLocaleString("en-Us")}**`)
            }if(!data){
                await new economy({
                    id: member.id,
                    Wallet: 500,
                    Bank: 100,
                    InBank: 0,
                    Inventory: [
                        {
                            Name: item.Name,
                            Count: amount
                        }
                    ]
                }).save().then(async () => {
                    await economy.updateOne({ "id": message.author.id, "Inventory.Name": item.Name }, { $inc: {"Inventory.$.Count": -amount} })
                    return message.lineReply(`You gave ${member.user.username} **${amount.toLocaleString("en-Us")} ${item.Name}**, Now they have **${parseInt(amount).toLocaleString("en-Us")}**`) 
                })
            }
        })
    }
}