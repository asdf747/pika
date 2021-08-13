const Discord = require('discord.js')
const fs = require('fs')
const loadCommands = require('../moderation/load-commands')
const loadCommands2 = require('../owner/load-commands')
const loadCommands3 = require('../utility/load-commands')
const loadCommands4 = require('../misc/load-commands')
const loadCommands5 = require('../whitelisted/load-commands')
const loadCommands6 = require('../fun/load-commands')
const loadCommands7 = require('../donations-thepoor/load-commands')
const loadCommands8 = require('../the-poor-guild-only/load-commands')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const config = require('../config.json')
const UserInfo = require('../models/whitelist')
const { MessageMenu, MessageMenuOption } = require('discord-buttons')

module.exports = {
  commands: 'help',
  description: "Shows the help menu",
  callback: async (message, arguments, text, client) => {
    let doc = await UserInfo.findOne({ id: message.author.id })
    let whitelisted = true
    if (!doc) whitelisted = false
    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = config.prefix
    let allcmds = []
    let alldescs = []
    let allargus = []
    let allalias = []
    let allsub = []
    let ac = []
    let ad = []
    let aa = []
    let bc = []
    let bd = []
    let ba = []
    let cc = []
    let cd = []
    let ca = []
    let dc = []
    let dd = []
    let da = []
    let ec = []
    let ed = []
    let ea = []
    let fc = []
    let fd = []
    let fa = []
    let gc = []
    let gd = []
    let ga = []
    let hc = []
    let hd = []
    let ha = []
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
      ac.push(mainCommand)
      ad.push(description)
      aa.push(args)

      allcmds.push(mainCommand)
      alldescs.push(description)
      allargus.push(args)
      allalias.push(aliases)
      allsub.push(subcmds)

    }
    const commands2 = loadCommands2()
    for (const command of commands2) {
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
      bc.push(mainCommand)
      bd.push(description)
      ba.push(args)

      allcmds.push(mainCommand)
      alldescs.push(description)
      allargus.push(args)
      allalias.push(aliases)
      allsub.push(subcmds)

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
      cc.push(mainCommand)
      cd.push(description)
      ca.push(args)

      allcmds.push(mainCommand)
      alldescs.push(description)
      allargus.push(args)
      allalias.push(aliases)
      allsub.push(subcmds)

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
      dc.push(mainCommand)
      dd.push(description)
      da.push(args)

      allcmds.push(mainCommand)
      alldescs.push(description)
      allargus.push(args)
      allalias.push(aliases)
      allsub.push(subcmds)

    }

    const commands5 = loadCommands5()
    for (const command of commands5) {
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
      ec.push(mainCommand)
      ed.push(description)
      ea.push(args)

      allcmds.push(mainCommand)
      alldescs.push(description)
      allargus.push(args)
      allalias.push(aliases)
      allsub.push(subcmds)

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
      fc.push(mainCommand)
      fd.push(description)
      fa.push(args)

      allcmds.push(mainCommand)
      alldescs.push(description)
      allargus.push(args)
      allalias.push(aliases)
      allsub.push(subcmds)

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
      gc.push(mainCommand)
      gd.push(description)
      ga.push(args)

      allcmds.push(mainCommand)
      alldescs.push(description)
      allargus.push(args)
      allalias.push(aliases)
      allsub.push(subcmds)

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
      hc.push(mainCommand)
      hd.push(description)
      ha.push(args)

      allcmds.push(mainCommand)
      alldescs.push(description)
      allargus.push(args)
      allalias.push(aliases)
      allsub.push(subcmds)

    }













    const moderation = ac.map((cmdd, i) => {
      return `\`${cmdd}\``
    }).join(' ')

    const owner = bc.map((cmdd, i) => {
      return `\`${cmdd}\``
    }).join(' ')

    const utility = cc.map((cmdd, i) => {
      return `\`${cmdd}\``
    }).join(' ')

    const misc = dc.map((cmdd, i) => {
      return `\`${cmdd}\``
    }).join(' ')

    const whitelist = ec.map((cmdd, i) => {
      return `\`${cmdd}\``
    }).join(' ')

    const fun = fc.map((cmdd, i) => {
      return `\`${cmdd}\``
    }).join(' ')

    const donation = gc.map((cmdd, i) => {
      return `\`${cmdd}\``
    }).join(' ')

    const guildonly = hc.map((cmdd, i) => {
      return `\`${cmdd}\``
    }).join(' ')
    if (!arguments[0]) {
      const uti = new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info`)
        .addField('🛠️ Utility commands', utility)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`)

      let option1 = new MessageMenuOption()
      .setLabel("Moderation commands")
      .setEmoji('🔨')
      .setValue("moderation")
      .setDescription('Shows the moderation commands.')

      let option2 = new MessageMenuOption()
      .setLabel("Owner commands")
      .setEmoji('👑')
      .setValue("owner")
      .setDescription('Shows the moderation commands.')

      let option3 = new MessageMenuOption()
      .setLabel("Utility commands")
      .setEmoji('🛠️')
      .setValue("utility")
      .setDescription('Shows the utility commands.')

      let option4 = new MessageMenuOption()
      .setLabel("Misc commands")
      .setValue("misc")
      .setDescription('Shows the misc commands.')

      let option5 = new MessageMenuOption()
      .setLabel("Whitelisted users commands")
      .setValue("whitelist")
      .setDescription('Shows the whitelisted users commands.')

      let option6 = new MessageMenuOption()
      .setLabel("Fun commands")
      .setValue("fun")
      .setEmoji('🥳')
      .setDescription('Shows the fun commands.')

      let option7 = new MessageMenuOption()
      .setLabel("Giveaway commands")
      .setEmoji('🎉')
      .setValue("donation")
      .setDescription('Shows the giveaway commands.')

      let option8 = new MessageMenuOption()
      .setLabel("Guild only commands")
      .setValue("guild")
      .setEmoji('❌')
      .setDescription('Shows the guild only commands.')

      let select = new MessageMenu()
      .setID("selector")
      .setPlaceholder("Select a group")
      .addOption(option1)
      .addOption(option3)
      .addOption(option4)
      .addOption(option6)
      if(message.author.id === '538352367654141952') select.addOption(option2)
      if(message.guild.id === '655780171496030240' && message.member.hasPermission('BAN_MEMBERS')) select.addOption(option8)
      if(message.member.roles.cache.some(r => (r.id === '783745136873439302' || r.id === '783745205684666419'))) select.addOption(option7)
      if(whitelisted) select.addOption(option5)


      const gall = new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info\n\nSelect a group from the drop menu.`)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`)

      const sendMenu = await message.channel.send(gall, select)

      const filter = ( button ) => button.clicker.user.id === message.author.id
      let collector = sendMenu.createMenuCollector(filter, { time: 60000 })

      collector.on('collect', (b) => {
        if(b.values[0] === 'moderation'){
          sendMenu.edit(
            new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info`)
        .addField('🔨 Moderation commands', moderation)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`), select
          )
        }
        if(b.values[0] == 'owner'){
          sendMenu.edit(
            new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info`)
        .addField('👑 Owner commands', owner)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`), select
          )
        }
        if(b.values[0] == 'utility'){
          sendMenu.edit(uti, select)
        }
        if(b.values[0] == 'misc'){
          sendMenu.edit(
            new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info`)
        .addField('Misc commands', misc)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`), select
          )
        }
        if(b.values[0] == 'whitelist'){
          sendMenu.edit(
            new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info`)
        .addField('Whitelisted users commands', whitelist)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`), select
          )
        }
        if(b.values[0] == 'fun'){
          sendMenu.edit(
            new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info`)
        .addField('🥳 Fun commands', fun)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`), select
          )
        }
        if(b.values[0] == 'donation'){
          sendMenu.edit(
            new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info`)
        .addField(':tada: Giveaway commands', donation)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`), select
          )
        }
        if(b.values[0] == 'guild'){
          sendMenu.edit(
            new MessageEmbed()
        .setTitle("Help menu")
        .setDescription(`Use \`${prefix}help\` with a command to get the command's info`)
        .addField('❌ Guild only commands', guildonly)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setFooter(`Prefix: ${prefix}`), select
          )
        }
        b.reply.defer()
      })



    } else {
      let include = false
      let check = message.member.roles.cache.some(r => (r.id === '783745136873439302' || r.id === '783745205684666419'))
      let info = allcmds.map((cmd, i) => {
        let allo = allalias[i].split(/[ ]+/).map(al => `\`${al}\``).join(' ')
        if(!allalias[i].length) allo = 'None.'
        let argos = `\`${allargus[i]}\``
        if(!allargus[i].length) argos = 'None.'
        let subs = allsub[i].split(/[ ]+/).map(al => `\`${al}\``).join(' ')
        if(!allsub[i].length) subs = 'None.'
        let alis = allalias[i].split(/[ ]+/).map(aliass => {
        if (cmd.toLowerCase() === arguments.slice(0).join(' ').toLowerCase() || aliass === arguments.slice(0).join(' ').toLowerCase()) {
          include = true
          if (bc.includes(cmd.toLowerCase()) && message.author.id !== '538352367654141952') return include = false
          if (ec.includes(cmd.toLowerCase()) && whitelisted === false) return include = false
          if (gc.includes(cmd.toLowerCase()) && !check) return include = false
          if (hc.includes(cmd.toLowerCase()) && message.guild.id !== '655780171496030240') return include = false

          
        }
        })
          if(include) return new MessageEmbed()
            .setTitle(`Help`)
            .setColor("GREEN")
            .setDescription(`**Command:** ${cmd}\n**Required Arguments:** ${argos}\n**Description:** ${alldescs[i]}\n**Aliases:** ${allo}\n${allsub[i].length ? `**Sub commands:** ${allsub[i].split(/[ ]+/).map(s => `\`${s}\``).join(' ')}` : ''}`)
            .setFooter(`Prefix: ${prefix}`)
        
      })
      if (!include) return message.channel.send("This command doesn't exist.")
      message.channel.send(info)

    }
  }
}