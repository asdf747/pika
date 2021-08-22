const sche = require('../models/donations')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['remove-donation', 'remove-dono'],
  minArgs: 2,
  type: 'guildonly',
  guildID: '655780171496030240',
  expectedArgs: '<member> <donation-number>',
  callback: async (message, arguments, text, client) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
    if(!member) return message.channel.send("I can't find this member.")
    sche.findOne({ Guild: message.guild.id, User: member.user.id }, async (err, data) => {
      if(data){
        let number = parseInt(arguments[1]) - 1
        if(Number(arguments[1]) > data.Amount) return message.channel.send(
          new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: This donation number doesn't exist.`)
          .setColor(15158332)
        )
        data.Donations.splice(number, 1)
        data.save()
        await sche.findOneAndUpdate({ Guild: message.guild.id, User: member.user.id }, { $inc: {Amount: -1} })
        message.channel.send(':white_check_mark: | Successfully deleted donation.')
      } if(!data){
        message.channel.send(
          new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: This user doesn't have any donation logged in this server.`)
          .setColor(15158332)
        )
      }
    })
  }
}