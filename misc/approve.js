const suggest = require('../models/suggestions')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'approve',
    permissions: 'ADMINISTRATOR',
    minArgs: 1,
    description: "Approve a suggestion",
    expectedArgs: '<SUGGESTION_ID> [reason]',
    callback: async (message, arguments, text, client) => {
        let suggeston = await suggest.findOne({ Guild: message.guild.id })
        if (!suggeston) return message.channel.send("That suggestion id doesn't exist")
        let suggestion = suggeston.Suggestions.find(sug => sug.ID === parseInt(arguments[0]))
        if (!suggestion) return message.channel.send("That suggestion id doesn't exist")
        let reason = 'No reason'
        if (arguments[1]) reason = arguments.slice(1).join(' ')
        message.channel.send(
            new MessageEmbed()
                .setTitle(`Suggestion #${suggestion.ID} approved`)
                .setColor("BLUE")
                .setDescription(`${suggestion.Suggestion}`)
                .addField(`Approved by ${message.author.tag}`, reason)
                .setAuthor(`${client.users.cache.get(suggestion.User) ? client.users.cache.get(suggestion.User).tag : 'Unknown#0000'}`, `${client.users.cache.get(suggestion.User) ? client.users.cache.get(suggestion.User).displayAvatarURL() : client.user.defaultAvatarURL()}`)
        )
        message.delete()
    }
}