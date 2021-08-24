const { temprole } = require('../funcs')
const ms = require('ms')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    commands: 'temprole',
    minArgs: 2,
    expectedArgs: '<member> <role> <duration>',
    permissions: "MANAGE_ROLES",
    callback: async(message, arguments, text, client) => {
        let role = message.guild.roles.cache.get(arguments[1])
        if(isNaN(arguments[1])) role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(arguments[1].toLowerCase()))
        if(arguments[1].startsWith('<@&') && arguments[1].endsWith('>')){
            nomnom = arguments[1].replace('<@&','').replace('>','')
            role = message.guild.roles.cache.get(nomnom)
        }
        if(!role) return message.channel.send("I can't find this role")
        if(role.position >= message.member.roles.highest.position) return message.channel.send("This role is higher than you")
        if(role.position >= message.guild.me.roles.highest.position) return message.channel.send("This role is higher than me")
        const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.toLowerCase().includes(arguments[0].toLowerCase())) || message.guild.members.cache.get(arguments[0])
        if(!member) return message.channel.send('I can\'t find this member')
        const duration = ms(arguments[2])
        if(!duration || duration < 1000) return message.channel.send("Please enter a valid duration")
        if(duration > 31557600000) return message.channel.send("Duration can't be more than 1 year")
        await temprole(message.guild, member, role, duration)
        message.channel.send(
            new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle("Added temporary role")
            .setColor("GREEN")
            .setTimestamp()
            .setDescription(`${member.user.toString()} has got the ${role.toString()} role for ${moment(new Date(Date.now() + duration)).fromNow().replace('in','')}`)
        )
    }
}