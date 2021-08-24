const bal = require('../models/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['balance', 'bal'],
  description: "Displays the user's balance.",
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.users.first() || client.users.cache.get(arguments[0]) || message.author

    await bal.findOne({ id: user.id }, async (err, data) => {
      if (data) {
        message.channel.send(
          new MessageEmbed()
            .setDescription(`**Wallet:** ${parseInt(data.Wallet).toLocaleString("en-US")}\n**Bank:** ${parseInt(data.InBank).toLocaleString("en-US")}${message.author.id === user.id ? `/${parseInt(data.Bank).toLocaleString("en-US")}` : ''}\n**Total:** ${parseInt(data.Wallet + data.InBank).toLocaleString("en-Us")}`)
            .setTimestamp()
            .setColor("BLUE")
            .setAuthor(`${user.username}${user.username.endsWith('s') ? '\'' : '\'s'} balance`, message.author.displayAvatarURL())
        )
      } else if (!data) {
        await new bal({
          id: user.id,
          Wallet: 500,
          InBank: 0,
          Bank: 100
        }).save()

        message.channel.send(
          new MessageEmbed()
            .setDescription(`**Wallet:** 500\n**Bank:** 0${message.author.id === user.id ? '/100' : ''}\n**Total:** 500`)
            .setTimestamp()
            .setColor("BLUE")
            .setAuthor(`${user.username}${user.username.endsWith('s') ? '\'' : '\'s'} balance`, message.author.displayAvatarURL())
        )

      }
    })

  }
}