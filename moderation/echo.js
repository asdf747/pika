const Discord = require('discord.js')
const db = require('quick.db')


module.exports = {
    commands: ['echo'],
    expectedArgs: '[channel] <text>',
    minArgs: 1,
    permissionError: 'You don\'t have permissions to use this command.',
    description: 'Send a message in a channel.',
    permissions: 'BAN_MEMBERS',
    callback: async (message, arguments, text, client) => {

    let content = arguments.slice(0).join(" ");
    if(arguments[0].startsWith('<#')){
      if(arguments[0].endsWith('>')){
        content = arguments.slice(1).join(" ");
      }
    }
    let channel = message.channel
    if(arguments[0].startsWith('<#')){
      if(arguments[0].endsWith('>')){
        let channelid = arguments[0].replace('<#','').replace('>','')
        channel = message.guild.channels.cache.get(channelid)
      }
    }
    if(!channel) return message.channel.send("I can't find this channel")
    .then(ass => message.react('👎'))
    if(!channel.permissionsFor(message.member).has('SEND_MESSAGES')) return message.react('👎')

    if(!message.member.hasPermission("ADMINISTRATOR")){
    channel.send({ content, allowedMentions: { repliedUser: true } })
    .then(ass => message.react('👍'))
    .catch(err => message.react('👎'))
    }else if(message.member.hasPermission("ADMINISTRATOR")){
      channel.send(`${content}`)
    .then(ass => message.react('👍'))
    .catch(err => message.react('👎'))
    }
    

    }
  }
