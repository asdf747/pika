module.exports = {
  commands: 'dm',
  description: 'Dms a member.',
  minArgs: 2,
  expectedArgs: '<member> <message>',
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
    if(!user) return message.lineReplyNoMention("Invalid user.")
    const content = arguments.slice(1).join(" ")
    if(content.length > 2000) return message.lineReplyNoMention("This message is too long")
    user.send(`${content}`)
    .then(gas => message.lineReplyNoMention(`Sent dm to **${user.user.tag}**`))
    .catch(err => message.lineReplyNoMention("I can't dm this member."))
  }
}