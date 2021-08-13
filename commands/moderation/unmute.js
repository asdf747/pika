const db = require('quick.db')
const Discord = require('discord.js')
require('discord-reply')


module.exports = {
    commands: ['unmute', 'um'],
    expectedArgs: '<@user/user_ID>',
    permissionError: 'You need to have permissions to use this command.',
    minArgs: 0,
    maxArgs: 1000,
    callback: async (message, arguments, text, client) => {
      let pref = await db.fetch(`prefix_${message.guild.id}_${client.user.id}`)
      if(pref === null) {pref = '='}
      let perm = await db.fetch(`unmute_${message.guild.id}_${client.user.id}`)
      if(perm === false) return message.lineReplyNoMention("This command is disabled in this guild.")
      if(!arguments[0]) return message.lineReply(`Incorrect syntax! Use \`${pref}unmute <@user/user_ID> [reason]\``)
      if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.lineReplyNoMention("Missing permissions")
     const role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes('muted'))
     if(!role) return message.lineReplyNoMention("I can't find the muted role.")
     const use = message.mentions.users.first() || client.users.cache.get(arguments[0])
     const user = message.guild.member(use, `Unmuted by ${message.author.tag}`)
     if(!user) return message.lineReplyNoMention("Invalid user.")
     let reaso = arguments.slice(1).join(" ")
     if(!reaso){reaso = `None`}
     let reas = arguments.slice(1).join(" ")
     if(!reas){reas = `Unmuted by ${message.author.tag}`}
     if(use.id === message.author.id) return message.lineReplyNoMention("You can't unmute yourself.")
     if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReplyNoMention("You can't unmute this user.")
    user.roles.remove(role, reas)
    .then(Updated => message.lineReplyNoMention(`Unmuted **${use.tag}**. Reason: ${reaso}`))
    .catch(err => message.lineReplyNoMention("I can'tun mute this user.."))
        
    },
    permissions: 'BAN_MEMBERS',
    requiredRoles: [],
  }