const Discord = require('discord.js')
const fs = require('fs')
const loadCommands = require('../moderation/load-commands')
const loadCommands3 = require('../utility/load-commands')
const loadCommands4 = require('../misc/load-commands')
const loadCommands6 = require('../fun/load-commands')
const loadCommands7 = require('../donations-thepoor/load-commands')
const loadCommands8 = require('../the-poor-guild-only/load-commands')
const loadCommands9 = require('../google/load-commands')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const config = require('../config.json')
const { MessageMenu, MessageMenuOption } = require('discord-buttons')
const REQUIRED = require('../models/dis')

module.exports = {
  commands: 'enable',
  description: 'Enables a command.',
  permissions: 'ADMINISTRATOR',
  minArgs: 1,
  expectedArgs: '<command>',
  callback: async (message, arguments, text, client) => {
    let allcmds = []
    let allalias = []
    let pooronly = []
    let donation = []
    let googleonly = []

    const commands = loadCommands()

    for (const command of commands) {
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const aliases =
        typeof command.commands === 'string'
          ? ``
          : `${command.commands.slice(1).join(' ')}`
      const args = command.expectedArgs ? `${command.expectedArgs}` : ''
      const subcmds = command.subCommands ? `${command.subCommands}` : ''
      const description = command.description ? ` ${command.description}` : 'No description'
      allcmds.push(mainCommand)
      allalias.push(aliases)

    }


    const commands3 = loadCommands3()
    for (const command of commands3) {
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const aliases =
        typeof command.commands === 'string'
          ? ``
          : `${command.commands.slice(1).join(' ')}`
      const args = command.expectedArgs ? `${command.expectedArgs}` : ''
      const subcmds = command.subCommands ? `${command.subCommands}` : ''
      const description = command.description ? ` ${command.description}` : 'No description'
      allcmds.push(mainCommand)
      allalias.push(aliases)

    }

    const commands4 = loadCommands4()
    for (const command of commands4) {
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const aliases =
        typeof command.commands === 'string'
          ? ``
          : `${command.commands.slice(1).join(' ')}`
      const args = command.expectedArgs ? `${command.expectedArgs}` : ''
      const subcmds = command.subCommands ? `${command.subCommands}` : ''
      const description = command.description ? ` ${command.description}` : 'No description'
      allcmds.push(mainCommand)
      allalias.push(aliases)

    }



    const commands6 = loadCommands6()
    for (const command of commands6) {
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const aliases =
        typeof command.commands === 'string'
          ? ``
          : `${command.commands.slice(1).join(' ')}`
      const args = command.expectedArgs ? `${command.expectedArgs}` : ''
      const subcmds = command.subCommands ? `${command.subCommands}` : ''
      const description = command.description ? ` ${command.description}` : 'No description'
      allcmds.push(mainCommand)
      allalias.push(aliases)

    }


    const commands7 = loadCommands7()
    for (const command of commands7) {
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const aliases =
        typeof command.commands === 'string'
          ? ``
          : `${command.commands.slice(1).join(' ')}`
      const args = command.expectedArgs ? `${command.expectedArgs}` : ''
      const subcmds = command.subCommands ? `${command.subCommands}` : ''
      const description = command.description ? ` ${command.description}` : 'No description'
      allcmds.push(mainCommand)
      donation.push(mainCommand)
      allalias.push(aliases)

    }


    const commands8 = loadCommands8()
    for (const command of commands8) {
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const aliases =
        typeof command.commands === 'string'
          ? ``
          : `${command.commands.slice(1).join(' ')}`
      const args = command.expectedArgs ? `${command.expectedArgs}` : ''
      const subcmds = command.subCommands ? `${command.subCommands}` : ''
      const description = command.description ? ` ${command.description}` : 'No description'

      allcmds.push(mainCommand)
      pooronly.push(mainCommand)
      allalias.push(aliases)

    }

    const commands9 = loadCommands9()
    for (const command of commands9) {
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string'
          ? command.commands
          : command.commands[0]
      const aliases =
        typeof command.commands === 'string'
          ? ``
          : `${command.commands.slice(1).join(' ')}`
      const args = command.expectedArgs ? `${command.expectedArgs}` : ''
      const subcmds = command.subCommands ? `${command.subCommands}` : ''
      const description = command.description ? ` ${command.description}` : 'No description'

      allcmds.push(mainCommand)
      googleonly.push(mainCommand)
      allalias.push(aliases)

    }

    let findcmd = allcmds.find(e => e === arguments.join(' ').toLowerCase())
    let ind = allcmds.findIndex(e => e === arguments.join(' ').toLowerCase())
    if (!findcmd) {
      findcmd = allalias.find(e => e === arguments.join(' ').toLowerCase())
      ind = allalias.findIndex(e => e === arguments.join(' ').toLowerCase())
    }
    if (!findcmd) return message.channel.send("This command doesn't exist.")
    if (donation.includes(allcmds[ind]) && message.guild.id !== '655780171496030240' || pooronly.includes(allcmds[ind]) && message.guild.id !== '655780171496030240') return message.channel.send("This command doesn't exist.")
    if (googleonly.includes(allcmds[ind]) && message.guild.id !== '854748129365721118') return message.channel.send("This command doesn't exist.")
    await REQUIRED.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {
        let findo = data.Cmds.find(e => e.Command === allcmds[ind])
        if (!findo) return message.channel.send("This command is already enabled.")
        if (findo && findo.Disabled === false) return message.channel.send("This command is already enabled.")
        if (findo && findo.Disabled === true) {
          let fon = data.Cmds.findIndex(e => e.Command === allcmds[ind])
          data.Cmds.splice(fon, 1)
          let objo = {
            Command: allcmds[ind],
            Disabled: false
          }
          data.Cmds.push(objo)
          data.save()
          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle("Enabled command.")
              .setDescription(`**Name:** ${allcmds[ind]}`)
              .setTimestamp()
          )
          return
        }
        let obj = {
          Command: allcmds[ind],
          Disabled: false
        }
        data.Cmds.push(obj)
        data.save()
        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Enabled command.")
            .setDescription(`**Name:** ${allcmds[ind]}`)
            .setTimestamp()
        )
      } if (!data) {
        await new REQUIRED({
          Guild: message.guild.id,
          Cmds: [
            {
              Command: allcmds[ind],
              Disabled: false
            }
          ]
        }).save()
        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Enabled command.")
            .setDescription(`**Name:** ${allcmds[ind]}`)
            .setTimestamp()
        )
      }
    })
  }
}