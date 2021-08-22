module.exports = {
    commands: ['mute', 'm'],
    expectedArgs: '<user> [reason]',
    minArgs: 1,
    permissionError: 'You don\'t have permissions to mute users.',
    description: 'Mutes a user',
    permissions: 'BAN_MEMBERS',
    callback: async (message, arguments, text, client) => {
      if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.lineReplyNoMention("Missing permissions")
     const role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes('muted'))
     if(!role) return message.lineReplyNoMention("I can't find the muted role.")
     const use = message.mentions.users.first() || client.users.cache.get(arguments[0])
     const user = message.guild.member(use, `Unmuted by ${message.author.tag}`)
     if(!user) return message.lineReplyNoMention("Invalid user.")
     let reaso = arguments.slice(1).join(" ")
     if(!reaso){reaso = `None`}
     let reas = arguments.slice(1).join(" ")
     if(!reas){reas = `Muted by ${message.author.tag}`}
     if(use.id === message.author.id) return message.lineReplyNoMention("You can't mute yourself.")
     if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReplyNoMention("You can't mute this user.")
    user.roles.add(role, reas)
    .then(Updated => message.lineReplyNoMention(`Muted **${use.tag}**. Reason: ${reaso}`))
    .catch(err => message.lineReplyNoMention("I can't mute this user.."))
        
    }
}