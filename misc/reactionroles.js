const reactionroles = require('../models/reactionroles')
const { MessageEmbed } = require('discord.js')
const { embedPages } = require('../funcs')

module.exports = {
    commands: ['reactionroles', 'rr'],
    minArgs: 1,
    permissions: "ADMINISTRATOR",
    subCommands: 'remove list',
    expectedArgs: 'create role_id = emoji[split by ,] [channel]',
    callback: async (message, arguments, text, client) => {
        if (arguments[0].toLowerCase() === 'create') {
            if (!arguments[1]) return message.channel.send(":x: Invalid arguments")
            let roles = arguments.slice(1).join('').split(',')
            if (roles.length > 9) return message.channel.send("Reaction roles can't be more than 9 roles")
            let invalidRoles = []
            let invaidEmojis = []
            let valid_roles = []
            let high_roles = []
            let high_roles_member = []
            let emojis = []
            let problem = false
            // checking invalid roles and valid roles
            roles.forEach((role, i) => {
                const roleo = role.split('=')
                if (roleo.length > 2) return problem = true
                const rolgo = message.guild.roles.cache.find(r => r.id === roleo[0])
                const emoji = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi.test(
                    roleo[1].split(' ')[0]
                ) || client.emojis.cache.find(em => em.toString() === `${roleo[1].split(' ')[0].toString()}`)
                if (!rolgo) return invalidRoles.push(i + 1)
                if (rolgo.position >= message.guild.me.roles.highest.position) high_roles.push(i + 1)
                if (rolgo.position >= message.member.roles.highest.position) high_roles_member.push(i + 1)
                if (rolgo) valid_roles.push(rolgo.id)
                if (!emoji) invaidEmojis.push(i + 1)
                if (emoji) emojis.push(roleo[1].split(' ')[0].toString())
            })
            if (problem) return message.channel.send(":x: Couldn't create reaction roles")
            // return if there's an invalid role or emoji
            if (invalidRoles.length) return message.channel.send(`:x: Role${invalidRoles.length !== 1 ? 's' : ''} number ${invalidRoles.map(e => e)} ${invalidRoles.length !== 1 ? 'are' : 'is'} invalid`)
            if (high_roles.length) return message.channel.send(`:x: Role${high_roles.length !== 1 ? 's' : ''} number ${high_roles.map(e => e)} ${high_roles.length !== 1 ? 'are' : 'is'} higher than me`)
            if (high_roles_member.length) return message.channel.send(`:x: Role${high_roles_member.length !== 1 ? 's' : ''} number ${high_roles_member.map(e => e)} ${high_roles_member.length !== 1 ? 'are' : 'is'} higher than you`)
            if (invaidEmojis.length) return message.channel.send(`:x: Emoji${invaidEmojis.length !== 1 ? 's' : ''} number ${invaidEmojis.map(e => e)} ${invaidEmojis.length !== 1 ? 'are' : 'is'} invalid`)
            let channel = message.channel
            if (arguments[arguments.slice(1).length].startsWith('<#') && arguments[arguments.slice(1).length].endsWith('>')) {
                nmonom = arguments[arguments.slice(1).length].replace('<#', '').replace('>', '')
                channel = message.guild.channels.cache.get(nmonom)
            }
            if (!channel) return message.channel.send(`:x: That channel doesn't exist`) // return if channel doesn't exist
            let msg = await channel.send(
                new MessageEmbed()
                    .setTitle("Reaction Roles")
                    .setDescription(valid_roles.map((r, i) => `<@&${r}> - ${emojis[i]}`).join('\n'))
            )
            let gos = []
            valid_roles.forEach((idk, i) => {
                gos.push({
                    Emoji: emojis[i],
                    Role: idk
                })
            })
            await new reactionroles({
                Guild: msg.guild.id,
                Channel: msg.channel.id,
                Message: msg.id,
                Roles: gos
            }).save()
            emojis.forEach(emoji => msg.react(emoji))
            const collector = msg.createReactionCollector((reaction, user) => Number(user.id), { dispose: true })
            message.channel.send('Created reaction roles')
            collector.on('collect', async (r, u) => {
                let findemoji = emojis.find(e => e === r.emoji.toString())
                if (findemoji) {
                    let ind = emojis.findIndex(e => e === r.emoji.toString())
                    const rolo = message.guild.roles.cache.get(valid_roles[ind])
                    if (rolo) {
                        const member = message.guild.members.cache.get(u.id)
                        if (member) {
                            member.roles.add(rolo)

                        }
                    }
                }
            })
            collector.on('remove', async (r, u) => {
                let findemoji = emojis.find(e => e === r.emoji.toString())
                if (findemoji) {
                    let ind = emojis.findIndex(e => e === r.emoji.toString())
                    const rolo = message.guild.roles.cache.get(valid_roles[ind])
                    if (rolo) {
                        const member = message.guild.members.cache.get(u.id)
                        if (member) member.roles.remove(rolo)
                    }
                }
            })


        } else if (arguments[0].toLowerCase() === 'list') {
            let data = await reactionroles.find({ Guild: message.guild.id })
            if (!data || !data.length) return message.channel.send("The list is empty")
            const list = data.map((w, i) => `**${i + 1}. ${w.Message}**\n**Channel:** <#${w.Channel}>\n**Link:** [Click here](https://discord.com/channels/${w.Guild}/${w.Channel}/${w.Message})`)
            let options = {
                color: "BLUE",
                joinBy: '\n\n',
                title: "Reaction roles"
            }
            embedPages(client, message, list, options)

        } else if (['delete', 'remove', '-'].includes(arguments[0].toLowerCase())) {
            if (!arguments[1]) return message.channel.send(":x: Enter a message id")
            let data = await reactionroles.findOne({ Message: arguments[1], Guild: message.guild.id })
            if (!data) return message.channel.send(":x: This message doesn't exist in the reaction role list")
            let msg = await message.guild.channels.cache.get(data.Channel).messages.fetch(data.Message)
            data.delete()
            if (!msg) return message.channel.send(":x: Couldn't find message")
            data.delete()
            msg.delete({ timeout: 5000 })
            message.channel.send(":white_check_mark: | Deleting message in 5 seconds")

        }
    }
}