let eco = require('../models/economy')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  commands: 'beg',
  description: 'beg for coins',
  cooldown: 30,
  callback: async (message, arguments, text, client) => {
    let amount = Math.floor(Math.random() * 100) + 1


      await eco.findOne({ id: message.author.id }, async (err, data) => {
        if(data){
          await eco.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
          message.channel.send(
            new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor("BLUE")
            .setDescription(`You begged and got **${amount} coins**!`)
          )
        } if(!data){
          await new eco({
            id: message.author.id,
            Wallet: 500,
            InBank: 100,
            Bank: 0
          }).save().then(async lol => {
            await eco.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
            message.channel.send(
              new MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setColor("BLUE")
              .setDescription(`You begged and got **${amount} coins**!`)
            )
          })
          
          

        }
      })
  }
  

}