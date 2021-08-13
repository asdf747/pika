const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'error',
  callback: async (message, arguments, text, client) => {
    message.channel.send(
      new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor(15158332)
      .setDescription(`:x: Incorrect Usage of command: Missing Components\n\n \`ass\``)
    )
  }
}