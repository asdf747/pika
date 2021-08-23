const reaction = require('../models/reactionlogs')
const msg = require('../models/messagelogs')
const db = require('../funcs')
const { MessageEmbed } = require('discord.js')
const config = require('../config.json')

module.exports = {
    commands: ['serversettings', 'guildsettings'],
    permissions: "ADMINISTRATOR",
    callback: async(message, arguments, text, client) => {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if(!prefix) prefix = config.prefix
        const reactionlogs = await reaction.findOne({ Guild: message.guild.id })
        const msglogs = await msg.findOne({ Guild: message.guild.id })
        const alt = await db.fetch(client, `alt_detector_${message.guild.id}`)
        const mute = await db.fetch(client, `muterole_${message.guild.id}`)
        if(arguments[0]){
            let things = ['reactionlogs', 'messagelogs', 'altdetector', 'prefix', 'muterole']
            if(!things.includes(arguments[0].toLowerCase())) return message.channel.send("This settings doesn't exist")
            switch(arguments[0].toLowerCase()){
                case "reactionlogs":
                    message.channel.send(`Use \`${prefix}reactionlogs set <channel>\` instead`)
                    break
                case "messagelogs":
                    message.channel.send(`Use \`${prefix}messagelogs set <channel>\` instead`)
                    break
                case "prefix":
                    message.channel.send(`Use \`${prefix}setprefix <prefix>\` instead`)
                    break
                case "altdetector":
                    let options = ['true', 'false']
                    if(!arguments[1]) return message.channel.send("Enter a value")
                    if(!options.includes(arguments[1].toLowerCase())) return message.channel.send("Invalid value the only values are `true/false`")
                    let value = false
                    let gaslo = 'off'
                    if(arguments[1].toLowerCase() === 'true') value = true
                    if(arguments[1].toLowerCase() === 'true') gaslo = 'on'
                    await db.set(`alt_detector_${message.guild.id}`, value)
                    message.channel.send(`:white_check_mark: | Turned ${gaslo} alt detector system`)
                    break
                case "muterole":
                    if(!arguments[1]) return message.channel.send("Please enter a role")
                    let role = message.guild.roles.cache.get(arguments[1])
                    if(isNaN(arguments[1])) role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(arguments.slice(1).join(' ')))
                    if(arguments[1].startsWith('<@&') && arguments[0].endsWith('>')){
                        nomnom = arguments[1].replace('<@&','').replace('<@&','')
                        role = message.guild.roles.cache.get(nomnom)
                    }
                    if(!role) return message.channel.send("Please enter a valid role")
                    await db.set(client, `muterole_${message.guild.id}`, role.id)
                    return message.channel.send({ content: `:white_check_mark: | Set the mute role to ${role.toString()}`, allowedMentions: {repliedUser: true} })
                    break
            }
            return
        }
        message.channel.send(
            new MessageEmbed()
            .setTitle(`Server settings for ${message.guild.name}`)
            .setFooter(message.guild.name, message.guild.iconURL() || null)
            .setTimestamp()
            .setColor("GREEN")
            .setThumbnail(message.guild.iconURL() || null)
            .addFields(
                { name: 'Prefix', value: `*\`${prefix}\`*`, inline: true },
                { name: 'Reaction logs', value: `*${reactionlogs ? `<#${reactionlogs.Channel}>` : "Disabled"}*`, inline: true },
                { name: 'Message logs', value: `*${msglogs ? `<#${msglogs.Channel}>` : "Disabled"}*`, inline: true },
                { name: 'Alt detector', value: `*${!alt ? `Disabled` : "Enabled"}*`, inline: true },
                { name: 'Mute role', value: `*${mute ? `<@&${mute}>` : "None"}*`, inline: true }
            )
        )
    }
}
