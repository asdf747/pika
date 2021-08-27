const { temprole } = require('../funcs')
const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    commands: 'abooze',
    description: "Mutes the mentioned member for a couple of seconds",
    callback: async (message, arguments, text, client) => {
        let time = ['13s', '14s', '15s', '16s', '17s', '18s', '19s', '20s', '25s', '26s', '27s', '28s', '29s', '30s', '31s', '32s', '36s', '37s', '38s', '39s', '40s', '45s', '50s', '55s', '60s', '69s']
        // choosing a random time
        let final = time[Math.floor(Math.random() * time.length)]
        let member = message.mentions.members.first() || message.member
        let role = message.guild.roles.cache.get('873038892369080330')
        await temprole(message.guild, member, role, ms(final))
        message.channel.send(`${member.id === message.author.id ? `${message.author.toString()} imagine muting yourself you clown` : ''}`,
        new MessageEmbed()
        .setAuthor('Get Muted', member.user.displayAvatarURL())
        .setColor(16711680)
        .setDescription(`${message.author.toString()} has given ${member.user.toString()}\n${role.toString()} for ${final.replace('s','seconds')}`)
        )
    }
}