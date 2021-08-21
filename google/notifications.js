const economy = require('../models/economy')
const utils = require('utils-discord')

module.exports = {
    commands: ['notifications', 'notifs'],
    callback: async(message, arguments, text, client) => {
        let notifs = await economy.findOne({ id: message.author.id })
        if(!notifs || !notifs.Notifications.length) return message.channel.send("You don't have any notifications yet")
        const notifs_array = notifs.Notifications.reverse().map((notify, i) => `**${notify.Type}**\n*${notify.Description}*`)

        let options = {
            perpage: 6,
            title: `${message.author.tag}'s notifications`,
            joinBy: "\n\n",
            color: "BLUE",
            footer: ' ',
            footerImage: ' ',
            timestamp: true
        }

        utils.createEmbedPages(client, message, notifs_array, options)
    }
}