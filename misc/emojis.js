const moment = require('moment')
const { embedPages } = require('../funcs')

module.exports = {
    commands: 'emojis',
    description: "Displays all the guild emojis.",
    permissions: "MANAGE_EMOJIS",
    callback: async (message, arguments, text, client) => {
        const emojis = message.guild.emojis.cache.sort((a, b) => b.createdTimestamp - a.createdTimestamp).map(async emoji => {
            return `${emoji.toString()}\n**Name:** ${emoji.name}\n**Animated:** ${emoji.animated}\n**Created at:** ${moment(emoji.createdTimestamp).format('l')}`
        })

        let options = {
            title: "Guild emojis",
            footer: message.guild.name,
            footerImage: message.guild.iconURL() || null,
            color: "BLUE",
            joinBy: '\n\n',
            args: arguments[0]
        }

        embedPages(client, message, emojis, options)
    }
}