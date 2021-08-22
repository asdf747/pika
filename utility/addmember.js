const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['addmember', 'addmem'],
  expectedArgs: '<user> [channel]',
  minArgs: 1,
  permissions: "MANAGE_CHANNELS",
  permissionError: "You can't manage channels.",
  permissionsbot: "MANAGE_CHANNELS",
  description: 'Adds a member to channel.',
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.users.first() || client.users.cache.get(arguments[0])
    const member = message.guild.member(user)
    if(!member) return message.lineReplyNoMention("This member doesn't exist")
    let channel = message.channel
    if(arguments[1]){
      if(arguments[1].startsWith('<#')){
        if(arguments[1].endsWith('>')){
          let num = arguments[1].replace('<#', '').replace('>', '')
          channel = message.guild.channels.cache.get(num)
          }
      }
    }
    if(!channel.permissionsFor(message.member).has('MANAGE_CHANNEL')) return message.react('👎')
      channel.createOverwrite(member, {
  SEND_MESSAGES: null,
  VIEW_CHANNEL: true
})
  .then(channel => message.lineReplyNoMention(
    new MessageEmbed()
    .setTitle("Added member")
    .setDescription(`**Tag:** ${user.tag}`)
    .setFooter(`ID: ${user.id}`)
  ))
  .catch(err => message.lineReplyNoMention("Couldn't add member"));

  }
}