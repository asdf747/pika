const COUNT = require('../models/rolecount')
const { MessageEmbed } = require('discord.js')
const schedule = require('node-schedule')
const { embedPage, embedPages } = require('../funcs')

module.exports = {
    commands: 'rolecounter',
    minArgs: 1,
    expectedArgs: 'create <roles[split by ,]> [channel]',
    permissions: "ADMINISTRATOR",
    description: 'Creates a role member counter embed that updates every 30 minutes',
    subCommands: 'remove list',
    callback: async (message, arguments, text, client) => {
        if (arguments[0].toLowerCase() === 'create') {
            if (!arguments[1]) return message.channel.send("Please mention the roles IDs and split them by a comma.")
            const roles = arguments[1].split(',')
            let invalidroles = []
            roles.forEach(role => {
                let rol = message.guild.roles.cache.get(role)
                if (isNaN(role)) rol = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(role))
                if (role.startsWith('<@&') && role.endsWith('>')) {
                    num = role.replace('<@&', '').replace('>', '')
                    rol = message.guild.roles.cache.get(num)
                }
                if (!rol) invalidroles.push(role)
            })
            if (invalidroles.length) return message.channel.send(`Role${invalidroles.length !== 1 ? 's' : ''} number ${invalidroles.map(r => r)} ${invalidroles.length !== 1 ? 'are' : 'is'} invalid.`)
            let channel = message.channel
            if (arguments[2] && arguments[2].startsWith('<#') && arguments[2].endsWith('>')) {
                ch = arguments[2].replace('<#', '').replace('>')
                channel = message.guild.channels.cache.get(ch)
            } else if (Number(arguments[2])) channel = message.guild.channels.cache.get(arguments[2])
            if (!channel) return message.channel.send("This channel doesn't exist.")
            let mas = 0
            channel.send(
                new MessageEmbed()
                    .setTitle(`Role${roles.length !== 1 ? 's' : ''} member count.`)
                    .setDescription(`${roles.map(role => {
                        return `${message.guild.roles.cache.get(role) ? `<@&${message.guild.roles.cache.get(role).id}> - ${Number(message.guild.roles.cache.get(role).members.size).toLocaleString('en-US')}` : 'Unknown role.'}`
                    }).join('\n')}`)
            ).then(async msg => {
                await new COUNT({
                    Guild: message.guild.id,
                    Message: msg.id,
                    Channel: channel.id,
                    Roles: roles
                }).save()
                message.channel.send(":white_check_mark: | Created Role member counter.")
                mas = msg.id
            })
            schedule.scheduleJob("*/30 * * * *", async function () {
                if (message.guild.channels.cache.get(channel.id) && message.guild.channels.cache.get(channel.id).messages.fetch(mas)) {
                    message.guild.channels.cache.get(channel.id).messages.fetch(mas).then(msg => {


                        msg.edit(
                            new MessageEmbed()
                                .setTitle(`Role${roles.length !== 1 ? 's' : ''} member count.`)
                                .setDescription(`${roles.map(role => {
                                    return `${message.guild.roles.cache.get(role) ? `<@&${message.guild.roles.cache.get(role).id}> - ${Number(message.guild.roles.cache.get(role).members.size).toLocaleString("en-US")}` : 'Unknown role.'}`
                                }).join('\n')}`)
                        )
                    })

                }
            })
        } else if (['remove', 'delete', '-'].includes(arguments[0].toLowerCase())) {
            if (!arguments[1]) return message.channel.send("Please mention a message id.")
            let finding = await COUNT.findOne({ Message: arguments[1] })
            if (!finding) return message.channel.send("This message doesn't exist!")
            message.guild.channels.cache.get(finding.Channel).messages.fetch(finding.Message).then(msg => msg.delete({ timeout: 5000 }))
            finding.delete()
            message.channel.send(":white_check_mark: | Deleting message in 5 seconds.")
        } else if (arguments[0].toLowerCase() === 'list') {
            let list = await COUNT.find({ Guild: message.guild.id })
            if (!list.length) return message.channel.send("The list is empty.")
            let listing = list.map((v, i) => {
                return `**${i + 1}.** ${v.Message}\n**Channel:** <#${message.guild.channels.cache.get(v.Channel).id}>\n**Link:** [Click here](https://discord.com/channels/${v.Guild}/${v.Channel}/${v.Message})`
            })

            let options = {
                joinBy: '\n\n',
                color: "BLUE",
                title: "Role counters"
            }

            embedPages(client, message, listing, options)
        }
    }
}