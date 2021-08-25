const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'react',
  description: 'Reacts to a message using message ID.',
  minArgs: 2,
  expectedArgs: '[channel] <message_ID> <emojis[split by ,]>',
  callback: async (message, arguments, text, client) => {
    let checker = 0
    if (arguments[0].startsWith('<#') && arguments[0].endsWith('>')) checker = 1
    if (isNaN(arguments[checker])) return message.channel.send("Invalid ID")
    const check = message.channel.messages.fetch(arguments[checker])
    if (!check) return message.channel.send("Invalid ID")
    let channel = message.channel
    if (arguments[0].startsWith('<#')) {
      if (arguments[0].endsWith('>')) {
        let num = arguments[0].replace('<#', '').replace('>', '')
        channel = message.guild.channels.cache.get(num)
      }
    }

    let emojis = arguments.slice(checker + 1)
    if (arguments.slice(checker + 1).join(' ').includes(',')) {
      let mojis = arguments.slice(checker + 1).join(' ').split(',')
      if (!channel) return message.channel.send(
        new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(':x: This channel doesn\'t exist.')
      )
      message.delete()
      let kong = await channel.messages.fetch(arguments[checker])
      if (!kong) return message.channel.send(
        new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(`:x: An error has occured!\n\n\`Unknown message\``)
      )
      mojis.forEach(emoji => {
        let moji = emoji.replace(/\s/g, '')
        kong.react(moji)
      })



    }
    else {


      if (!channel) return message.channel.send(
        new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(':x: This channel doesn\'t exist.')
      )
      let kong = await channel.messages.fetch(arguments[checker])
      if (!kong) return message.channel.send(
        new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(`:x: An error has occured!\n\n\`Unknown message\``)
      )
      channel.messages.fetch(arguments[checker])
        .then(msg => msg.react(emojis[0])
          .then(message.delete())
        )
        .catch(err => message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(15158332)
            .setDescription(`:x: An error has occured!\n\n\`${err}\``)
        ))
    }
  }
}