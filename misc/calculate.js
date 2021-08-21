const disbut = require('discord-buttons');
const { calculate } = require('easy-calculation')
const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['calculate', 'calc', 'cal'],
  description: 'Solves a math equation.',
  callback: async (message, arguments, text, client) => {
    message.channel.send(
      new MessageEmbed()
        .setTitle("Calculator")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setThumbnail(message.guild.iconURL() || null)
        .setDescription(`**Input:**\n\`\`\`${arguments.slice(0).join(' ')}\`\`\`\n\n**Output:**\n\`\`\`${calculate(arguments.slice(0).join(' '), true)}\`\`\``)
        .setTimestamp()
    )
  }
}