const bal = require('../models/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['balance', 'bal'],
  description: "Displays the user's balance.",
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.users.first() || client.users.cache.get(arguments[0]) || message.author

    await bal.findOne({ id: user.id }, async (err, data) => {
      if(data){
        message.channel.send(
          new MessageEmbed()
          .setTitle(`${user.username}${user.username.endsWith('s') ? '\'' : '\'s'} balance`)
          .setDescription(`**Wallet:** ${parseInt(data.Wallet).toLocaleString("en-US")}\n**Bank:** ${parseInt(data.InBank).toLocaleString("en-US")}/${parseInt(data.Bank).toLocaleString("en-US")}`)
          .setTimestamp()
          .setColor("BLUE")
        )
      } else if(!data){
        await new bal({
          id: user.id,
          Wallet: 500,
          InBank: 0,
          Bank: 100
        }).save()

        message.channel.send(
          new MessageEmbed()
          .setTitle(`${user.username}${user.username.endsWith('s') ? '\'' : '\'s'} balance`)
          .setDescription(`**Wallet:** 500\n**Bank:** 0/100`)
          .setTimestamp()
          .setColor("BLUE")
        )

      }
    })

  }
}