
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
        switch(item.ID[0].toLowerCase()){
            case 'pp':
                message.channel.send(uses.pp(client, message, arguments, economy))
            
        }
    }
}