const donos = require('../models/donations')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['reset-donations', 'reset-donation'],
  minArgs: 1,
  expectedArgs: '<member>',
  type: 'guildonly',
  guildID: '655780171496030240',
  callback: async (message, arguments, text, client) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
  if(!member) return message.channel.send(
    new MessageEmbed()
    .setAuthor(message.author.name, message.author.displayAvatarURL())
    .setDescription(`:x: I can't find this member`)
    .setColor(15158332)
  )
  await donos.findOne({ User: member.id }, async (err, data) => {
    if(data){
      if(!data.Donations.length) return message.channel.send(
        new MessageEmbed()
    .setAuthor(message.author.name, message.author.displayAvatarURL())
    .setDescription(`:x: This user doesn't have any donation logged`)
    .setColor(15158332)
  )
data.delete()
  message.channel.send(`:white_check_mark: | Removed all ${member.user.username}${member.user.username.endsWith('s') ? "'" : '\'s'} donations.`)
    }if(!data){
      message.channel.send(new MessageEmbed()
    .setAuthor(message.author.name, message.author.displayAvatarURL())
    .setDescription(`:x: This user doesn't have any donation logged`)
    .setColor(15158332)
  )
    }
  })
  }
}