module.exports = {
  commands: ['unban'],
  description: "Unbans a user",
  permissions: "BAN_MEMBERS",
  permissionError: "You can't unban users.",
  permissionsbot: "BAN_MEMBERS",
  minArgs: 1,
  expectedArgs: '<user_ID> [reason]',
  callback: async (message, arguments, text, client) => {
   let reaso = arguments.slice(1).join(" ")
   if(!reaso){reaso = 'None'}
    message.guild.members.unban(arguments[0], reaso)
    .then(user => message.lineReplyNoMention(`Unbanned **${user.tag}**`))
    .catch(err => message.channel.send(`${err}`))
  }
}