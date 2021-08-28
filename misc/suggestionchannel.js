const suggest = require('../models/suggestions')

module.exports = {
    commands: 'suggestionchannel',
    minArgs: 1,
    permissions: "ADMINISTRATOR",
    expectedArgs: "<channel/none>",
    callback: async (message, arguments, text, client) => {
        let channel = message.mentions.channels.first()
        if (!channel && arguments[0] !== 'none') return message.channel.send("That channel doesn't exist")
        if (arguments[0] === 'none') channel = 'null'
        if (channel) channel = channel.id
        await suggest.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                await suggest.findOneAndUpdate({ Guild: message.guild.id }, { $set: { Channel: channel } })
                message.channel.send(`Set the suggestion channel to **${Number(channel) ? `<#${channel}>` : 'none'}**`)
            } if (!data) {
                if (channel === 'null') return message.channel.send("The suggestion channel isn't even set")
                await new suggest({
                    Guild: message.guild.id,
                    Channel: channel
                }).save()
                message.channel.send(`Set the suggestion channel to **${Number(channel) ? `<#${channel}>` : 'none'}**`)
            }
        })
    }
}