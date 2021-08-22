module.exports = {
  commands: 'bon',
  description: "A fake ban command.",
  minArgs: 1,
  expectedArgs: '<user> [reason]',
  callback: async (message, arguments, text, client) => {
    let mention = message.mentions.members.first() || message.guild.member(client.users.cache.get(arguments[0]))
    let thingy = arguments[0]
    if(mention){thingy = mention.user.tag}
    const offender = thingy
    let reason = arguments.slice(1).join(" ")
    if(!reason){reason = 'None'}
    message.lineReplyNoMention(`Banned **${offender}**. Reason: ${reason}.`)
  }
}