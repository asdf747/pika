const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['ping'],
  description: 'Checks the bot\'s latency.',
  callback: async (message, arguments, text, client) => {
    message.lineReplyNoMention(
      new MessageEmbed()
      .setTitle("Calcultating ping...")
    ).then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp

      resultMessage.edit(
        new MessageEmbed()
        .setTitle('🏓 Pong!')
        .setDescription(`Bot latency: \`${ping}\`\nAPI Latency: \`${client.ws.ping}\``)
        .setFooter(`Hit the ball by ${message.author.tag}`)
      )
    })
  }
}