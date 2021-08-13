module.exports = {
  commands: ['ban'],
  expectedArgs: '<user> [reason]',
  minArgs: 1,
  description: 'Bans a user',
  permissionError: 'You can\'t ban members',
  permissions: "BAN_MEMBERS",
  permissionsbot: "BAN_MEMBERS",
  callback: async (message, arguments, text, client) => {
    const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === arguments[0])
    if(!member) return message.lineReplyNoMention('Invalid member.')
    if(member.user.id === message.guild.ownerID) return message.lineReplyNoMention("You can't ban the owner.")
    if(member.roles.highest.position >= message.guild.me.roles.highest.position) return message.lineReplyNoMention("I can't ban this member.")
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReplyNoMention('You can\'t ban this member.')
    let reaso = arguments.slice(1).join(" ")
    if(!reaso){reaso = 'None'}
    let reasoo = arguments.slice(1).join(" ")
    if(!reasoo){reasoo = `Banned by ${message.author.tag}`}
    member.ban({ reason: reasoo })
    .then(ban => message.lineReplyNoMention(`Banned **${member.user.tag}**. Reason: ${reaso}`))
    .catch(err => message.lineReplyNoMention("I can't ban this member."))
  
  }
}