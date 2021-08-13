const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['fetch'],
  expectedArgs: '<invites/bans>',
  minArgs: 1,
  permissions: "MANAGE_GUILD",
  permissionError: "You can't use this command.",
  description: 'Fetches invites or bans',
  callback: async (message, arguments, text, client) => {
    const guild = message.guild

if(arguments[0].toLowerCase() === "bans"){
guild.fetchBans().then(bans => message.lineReplyNoMention(
  new MessageEmbed()
  .setTitle("Fetched bans!")
  .setDescription(`**${bans.size}** total ban(s).`)
  .setTimestamp()
))

}
else if(arguments[0].toLowerCase() === "invites"){
guild.fetchInvites().then(invites => message.lineReplyNoMention(
  new MessageEmbed()
  .setTitle("Fetched bans!")
  .setDescription(`**${invites.size}** total invite(s).`)
  .setTimestamp()
))
} else if(arguments[0].toLowerCase() === "info"){
  const info = new MessageEmbed()
  .setTitle("Fetch types")
  .setDescription(`**Bans**\n**Invites**`)
  message.lineReplyNoMention(info)
}
else return message.lineReplyNoMention("Invalid argument.")

  }
}