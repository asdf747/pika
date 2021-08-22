const utils = require('utils-discord')
const moment = require('moment')

module.exports = {
    commands: 'emojis',
    description: "Displays all the guild emojis.",
    permissions: "MANAGE_EMOJIS",
    callback: async(message, arguments, text, client) => {
        const emojis = message.guild.emojis.cache.map(emoji => {
            let gas = ''
            let fetch_author = emoji.fetchAuthor().then(ass => gas = ass.tag)
return `${emoji.toString()}\n**Name:** ${emoji.name}\n**Animated:** ${emoji.Animated}\n**Created at:** ${moment(emoji.createdTimestamp).format('l')}`
        })

        let options = {
            title: "Guild emojis",
            footer: message.guild.name,
            footerImage: message.guild.iconURL() || null,
            color: "BLUE",
            joinBy: '\n\n',
            args: arguments[0]
            }
            
            utils.createEmbedPages(client, message, emojis, options)
    }
}