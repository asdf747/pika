const bal = require('../models/economy')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['balance', 'bal'],
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.users.first() || client.users.cache.get(arguments[0]) || message.author

    await bal.findOne({ id: user.id }, async (err, data) => {
      if(data){
        message.channel.send(
          new MessageEmbed()
          .setTitle(`${user.username}'s balance`)
          .setDescription(`**Wallet:** ${data.Wallet}\n**Bank:** ${data.InBank}/${data.Bank}`)
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
          .setTitle(`${user.username}'s balance`)
          .setDescription(`**Wallet:** 500\n**Bank:** 0/100`)
        )

      }
    })

  }
}