
const economy = require('../models/economy')
const items = require('../shop.json')
const uses = require('../uses')

module.exports = {
    commands: 'use',
    minArgs: 1,
    expectedArgs: '<item>',
    callback: async(message, arguments, text, client) => {
        let item = items.find(item => item.ID.includes(arguments[0].toLowerCase()))
        if(!item) return message.channel.send("This item doesn't exist.")
        let doc = await economy.findOne({ id: message.author.id })
        if(!doc || !doc.Inventory.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase()) || doc.Inventory.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase()).Count < 1) return message.channel.send("You don't own this item")
        switch(item.ID[0].toLowerCase()){
            case 'pp':
                await uses.pp(client, message, arguments, economy);
            
        }
    }
}