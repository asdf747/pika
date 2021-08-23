const db = require('../funcs')
const config = require('../config.json')

module.exports = {
    commands: ['unmute', 'um'],
    expectedArgs: '<user> [reason]',
    minArgs: 1,
    permissionError: 'You don\'t have permissions to unmute users.',
    description: 'Unmutes a user',
    permissions: 'BAN_MEMBERS',
    permissionsbot: "MANAGE_ROLES",
    callback: async (message, arguments, text, client) => {
      if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.lineReplyNoMention("Missing permissions")
      let prefix = client.prefixes.get(message.guild.id)[0].Prefix || config.prefix
      const check = await db.fetch(client, `muterole_${message.guild.id}`)
      if(!check) return message.channel.send(`Please set the mute role using \`${prefix}serversettings muterole <role>\``)
     const role = message.guild.roles.cache.find(r => r.id === check)
     if(!role) return message.lineReplyNoMention("The muted role doesn't exist")
     const use = message.mentions.users.first() || client.users.cache.get(arguments[0])
     const user = message.guild.member(use)
     if(!user) return message.lineReplyNoMention("Invalid user.")
     let reaso = arguments.slice(1).join(" ")
     if(!reaso){reaso = `None`}
     let reas = arguments.slice(1).join(" ")
     if(!reas){reas = `Unmuted by ${message.author.tag}`}
     if(use.id === message.author.id) return message.lineReplyNoMention("You can't ummute yourself.")
     if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReplyNoMention("You can't ummute this user.")
    user.roles.remove(role, reas)
    .then(Updated => message.lineReplyNoMention(`Unmuted **${use.tag}**. Reason: ${reaso}`))
    .catch(err => message.lineReplyNoMention("I can't unmute this user."))
        
    }
}