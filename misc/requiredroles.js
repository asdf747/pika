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
const REQUIRED = require('../models/toggle')
const { embedPages } = require('../funcs')

module.exports = {
  commands: 'requiredroles',
  minArgs: 1,
  description: 'Adds required roles to a command',
  permissions: 'ADMINISTRATOR',
  expectedArgs: 'add <command> <roles>',
  subCommands: 'remove list',
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
      allalias.push(aliases)

      donation.push(mainCommand)

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
      allalias.push(aliases)

      pooronly.push(mainCommand)

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
      allalias.push(aliases)

      googleonly.push(mainCommand)

    }


    if (arguments[0].toLowerCase() === 'add') {
      if (!arguments[1]) return message.channel.send("Please mention a command.")
      if (!arguments[2]) return message.channel.send("Please mention a role's ID.")
      let findcmd = allcmds.find(e => e === arguments[1].toLowerCase())
      let ind = allcmds.findIndex(e => e === arguments[1].toLowerCase())
      if (!findcmd) {
        findcmd = allalias.find(e => e === arguments[1].toLowerCase())
        ind = allalias.findIndex(e => e === arguments[1].toLowerCase())
      }
      if (!findcmd) return message.channel.send("This command doesn't exist.")
      if (allcmds[ind] === 'requiredroles' || allcmds[ind] === 'enable' || allcmds[ind] === 'disable') return message.channel.send("You can't add required roles to this command.")
      if (donation.includes(allcmds[ind]) && message.guild.id !== '655780171496030240' || pooronly.includes(allcmds[ind]) && message.guild.id !== '655780171496030240') return message.channel.send("This command doesn't exist.")
      if (googleonly.includes(allcmds[ind]) && message.guild.id !== '854748129365721118') return message.channel.send("This command doesn't exist.")
      if (!arguments.slice(2).join(' ').includes(',')) {
        let role = message.guild.roles.cache.get(arguments[2])
        if (arguments[2].startsWith('<@&') && arguments[2].endsWith('>')) {
          num = arguments[2].replace('<@&', '').replace('>', '')
          role = message.guild.roles.cache.get(num)
        }
        if (isNaN(arguments[2])) role = message.guild.roles.cache.find(e => e.name.toLowerCase().includes(arguments[2]))
        if (!role) return message.channel.send(`This role doesn't exist.`)
      } else if (arguments.slice(2).join(' ').includes(',')) {
        let roles = arguments.slice(2).join(' ').split(',')
        let wrong = false
        let invalis = []
        roles.forEach((role, i) => {
          if (!message.guild.roles.cache.get(role)) {
            wrong = true
            invalis.push(i + 1)
          }
        })
        if (wrong) return message.channel.send(`Role${invalis.length !== 1 ? 's' : ''} number ${invalis.map(a => a)} ${invalis.length !== 1 ? 'are' : 'is'} invalid.`)
      }
      await REQUIRED.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          let exist = false
          data.Cmds.forEach(cmd => {
            if (cmd.Command === allcmds[ind]) exist = true
          })
          if (exist) return message.channel.send("This command already has required roles.")
          let obj = {
            Command: allcmds[ind],
            Roles: []
          }
          arguments.slice(2).join(' ').split(',').forEach((r, i) => {
            let rol = message.guild.roles.cache.get(r)
            if (isNaN(r)) rol = message.guild.roles.cache.find(rr => rr.name.toLowerCase().includes(r.toLowerCase()))
            if (r.startsWith('<@&') && r.endsWith('>')) {
              num = r.replace('<@&', '').replace('>', '')
              rol = message.guild.roles.cache.get(num)
            }
            if (rol) {
              obj.Roles.push(rol.id)
            }


          })
          let them = arguments.slice(2).join(' ').split(',').map((r, i) => {
            let rol = message.guild.roles.cache.get(r)
            if (isNaN(r)) rol = message.guild.roles.cache.find(rr => rr.name.toLowerCase().includes(r.toLowerCase()))
            if (r.startsWith('<@&') && r.endsWith('>')) {
              num = r.replace('<@&', '').replace('>', '')
              rol = message.guild.roles.cache.get(num)
            }
            if (rol) {
              return `<@&${rol.id}>`
            }
          })
          data.Cmds.push(obj)
          data.save()
          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle('Added required roles.')
              .setDescription(`**Name:** ${allcmds[ind]}\n**Roles:** ${them.join(', ')}`)
              .setTimestamp()
          )
        } if (!data) {
          let gas = []
          arguments.slice(2).join(' ').split(',').forEach((r, i) => {
            let rol = message.guild.roles.cache.get(r)
            if (isNaN(r)) rol = message.guild.roles.cache.find(rr => rr.name.toLowerCase().includes(r.toLowerCase()))
            if (r.startsWith('<@&') && r.endsWith('>')) {
              num = r.replace('<@&', '').replace('>', '')
              rol = message.guild.roles.cache.get(num)
            }
            if (rol) {
              gas.push(rol.id)
            }
          })
          let them = arguments.slice(2).join(' ').split(',').map((r, i) => {
            let rol = message.guild.roles.cache.get(r)
            if (isNaN(r)) rol = message.guild.roles.cache.find(rr => rr.name.toLowerCase().includes(r.toLowerCase()))
            if (r.startsWith('<@&') && r.endsWith('>')) {
              num = r.replace('<@&', '').replace('>', '')
              rol = message.guild.roles.cache.get(num)
            }
            if (rol) {
              return `<@&${rol.id}>`
            }
          })
          await new REQUIRED({
            Guild: message.guild.id,
            Cmds: [
              {
                Command: allcmds[ind],
                Roles: gas
              }
            ]
          }).save()


          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle('Added required roles.')
              .setDescription(`**Name:** ${allcmds[ind]}\n**Roles:** ${them.join(', ')}`)
              .setTimestamp()
          )
        }
      })
    } else if (arguments[0].toLowerCase() === 'remove') {
      if (!arguments[1]) return message.channel.send("Please mention a command.")
      let findcmd = allcmds.find(e => e === arguments[1].toLowerCase())
      let ind = allcmds.findIndex(e => e === arguments[1].toLowerCase())
      if (!findcmd) {
        findcmd = allalias.find(e => e === arguments[1].toLowerCase())
        ind = allalias.findIndex(e => e === arguments[1].toLowerCase())
      }
      if (!findcmd) return message.channel.send("This command doesn't exist.")
      if (donation.includes(allcmds[ind]) && message.guild.id !== '655780171496030240' || pooronly.includes(allcmds[ind]) && message.guild.id !== '655780171496030240') return message.channel.send("This command doesn't exist.")
      if (googleonly.includes(allcmds[ind]) && message.guild.id !== '854748129365721118') return message.channel.send("This command doesn't exist.")
      await REQUIRED.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          if (!data.Cmds.length) return message.channel.send("There isn't any command added.")
          let exit = false
          data.Cmds.forEach((cmd, i) => {
            if (cmd.Command === allcmds[ind]) {
              exit = true
              data.Cmds.splice(i, 1)
              data.save()
            }
          })
          if (!exit) return message.channel.send("This command doesn't have any required roles.")
          message.channel.send(
            new Discord.MessageEmbed()
              .setTitle('Removed required roles.')
              .setDescription(`**Name:** ${allcmds[ind]}`)
              .setTimestamp()
          )
        } if (!data) {
          message.channel.send("There isn't any command added.")
        }
      })
    } else if (arguments[0].toLowerCase() === 'list') {
      let list = await REQUIRED.findOne({ Guild: message.guild.id })
      if (!list) return message.channel.send("The list is empty")
      const reqs = list.Cmds.reverse().map((w, i) => `**${i + 1}. Command: ${w.Command}**\n**Roles:** ${w.Roles.map(a => `<@&${a}>`).join(', ')}`)
      let options = {
        title: "Commands that have required roles",
        thumbnail: message.guild.iconURL || null,
        perPage: 7,
        joinBy: '\n\n',
        color: "BLUE"
      }
      embedPages(client, message, reqs, options)
    }


  }
}