const economy = require('../models/economy')

module.exports = {
    commands: ['deposit', 'dep'],
    minArgs: 1,
    expectedArgs: '<amount>',
    callback: async(message, arguments, text, client) => {
        if(!Number(arguments[0])) return message.channel.send("Enter a valid number.")
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                
            }
        })
    }
}