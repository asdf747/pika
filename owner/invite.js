const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'invite',
  description: "Gives you an invite for the bot",
  callback: async (message, arguments, text, client) => {
    const link = "https://discord.com/api/oauth2/authorize?client_id=818876645401427989&permissions=8&scope=bot"
    message.channel.send(
      new MessageEmbed()
      .setTitle(`Invite for ${client.user.username}`)
      .setDescription(`[Click here](${link})`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(message.guild.me.displayColor)
    )
  }
}