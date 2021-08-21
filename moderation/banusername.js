const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'banusername',
    description: "Bans members with the same username",
    minArgs: 1,
    permissions: "BAN_MEMBERS",
    expectedArgs: '<username>',
    callback: async(message, arguments, text, client) => {
        const members = message.guild.members.cache.filter(m => m.user.username.toLowerCase() === arguments.slice(0).join(' ').toLowerCase())
        if(!members.length) return message.channel.send("Nobody in this server has this username")
        let total = 0
        let reason = `Banned by ${message.author.tag}`
        members.forEach(member => {
            message.guild.members.ban(member.id, { reason })
            total++
        })
        await message.channel.send(
            new MessageEmbed()
            .setTitle("Banned members.")
            .setDescription(`**Members count:** ${total}`)
            .setTimestamp()
        )
    }
}