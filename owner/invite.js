const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'invite',
  description: "Gives you an invite for the bot",
  callback: async (message, arguments, text, client) => {
    const link = "https://discord.com/oauth2/authorize?client_id=818876645401427989&permissions=2080500982&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D818876645401427989%26permissions%3D8%26scope%3Dbot&scope=bot"
    message.channel.send(
      new MessageEmbed()
      .setTitle(`Invite for ${client.user.username}`)
      .setDescription(`[Click here](${link})`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(message.guild.me.displayColor)
    )
  }
}