const { WebhookClient } = require('discord.js')

module.exports = {
    commands: 'sudo',
    minArgs: 2,
    expectedArgs: '<member> <content>',
    callback: async(message, arguments, text, client) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
        if(!member) return message.channel.send('This member doesn\'t exist.')
        message.channel.createWebhook('sudo').then(webhook => {
            let arnav = new WebhookClient(`${webook.id}`, `${webhook.token}`)
            arnav.send(arguments.slice(1).join(' '), {
                username: member.displayName,
                avatarURL: member.user.displayAvatarURL()
            }).then(() => {
                message.delete()
                arnav.delete()
            })
        })
    }
}