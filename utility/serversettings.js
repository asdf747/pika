const reaction = require('../models/reactionlogs')
const msg = require('../models/messagelogs')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://lol:fofo29112007@golgo.t3bmd.mongodb.net/gg?retryWrites=true&w=majority")
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
        const alt = await db.fetch(`alt_detector_${message.guild.id}`)
        if(arguments[0]){
            let things = ['reactionlogs', 'messagelogs', 'alt detector', 'prefix']
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
                case "alt detector":
                    let options = ['true', 'false']
                    if(!arguments[1]) return message.channel.send("Enter a value")
                    if(!options.includes(arguments[1].toLowerCase())) return message.channel.send("Invalid value the only values are `true/false`")
                    await db.set(`alt_detector_${message.guild.id}`, true)
                    message.channel.send(':white_check_mark: | Turned on alt detector system')
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
                { name: 'Alt detector', value: `*${!alt ? `Disabled` : "Enabled"}*`, inline: true }
            )
        )
    }
}
