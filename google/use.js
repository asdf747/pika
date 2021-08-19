
const economy = require('../models/economy')
const items = require('../shop.json')

module.exports = {
    commands: 'use',
    minArgs: 1,
    expectedArgs: '<item>',
    callback: async(message, arguments, text, client) => {
        let item = items.find(item => item.ID.includes(arguments[0].toLowerCase()))
        if(!item) return message.channel.send("This item doesn't exist.")
        switch(arguments[0]){
            case 'pp':
                await economy.findOne({ id: message.author.id }, async (err, data) => {
                    if(data){
                        
                        message.channel.send(`aaa ${data.Wallet}`)
                    }
                })
            
        }
    }
}