const suggest = require('../models/suggestions')

module.exports = {
    commands: 'suggestionchannel',
    minArgs: 1,
    permissions: "ADMINISTRATOR",
    expectedArgs: "<channel/none>",
    callback: async (message, arguments, text, client) => {
        let channel = message.mentions.channels.first()
        if(!channel && arguments[0] !== 'none') return message.channel.send("That channel doesn't exist")
        if(arguments[0] === 'none') channel = 'null'
        await suggest.findOne({ Guild: message.guild.id }, async(err, data => {
            if(data){
                await suggest.findOne({ Guild: message.guild.id }, { $set: {Channel: `${channel ? channel.id : 'null'}`} })
                message.channel.send(`Set the suggestion channel to **${channel ? channel.toString : 'none'}**`)
            }if(!data){
                if(channel === 'null') return message.channel.send("The suggestion channel isn't even set")
                await new suggest({
                    Guild: message.guild.id,
                    Channel: `${channel ? channel.id : 'null'}`
                }).save()
                message.channel.send(`Set the suggestion channel to **${channel ? channel.toString() : 'none'}**`)
            }
        }))
    }
}