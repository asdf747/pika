const MessageLogs = require('../models/messagelogs')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['messagelogs', 'messagelog'],
  description: 'Sets the message logs channel for guild',
  minArgs: 1,
  expectedArgs: '<channel/none>',
  callback: async (message, arguments, text, client) => {
    let channel = message.guild.channels.cache.get(arguments[0])
    if(arguments[0].startsWith('<#')){
      if(arguments[0].endsWith('>')){
        let num = arguments[0].replace('<#', '').replace('>', '')
        channel = message.guild.channels.cache.get(num)
      }
    }
    if('none'.includes(arguments[0].toLowerCase())){
      await MessageLogs.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          data.delete()
          .then(() => message.lineReplyNoMention("Removed the message logs channel."))
          .catch(() => message.lineReplyNoMention(
            new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(":x: Database error!")
          ))
        } else if(!data){
          message.lineReplyNoMention(
            new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(":x: There is no channel set."))
        }
      })
    } else {
      if(!channel) return message.lineReplyNoMention(
        new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(":x: Please specify a channel.")
      )
    await MessageLogs.findOne({ Guild: message.guild.id }, async (err, data) => {
      if(data){
        MessageLogs.findOneAndUpdate({ Guild: message.guild.id }, { $set: {Channel: channel.id} })
        .then(() => message.lineReplyNoMention(`Set message logs channel to **#${channel.name}**`))
        .catch(() => message.lineReplyNoMention(
          new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(":x: Database error!")
        ))
      } else if(!data){
        const newDoc = new MessageLogs({ Guild: message.guild.id, Channel: channel.id })
        newDoc.save()
        .then(() => message.lineReplyNoMention(`Set message logs channel to **#${channel.name}**`))
        .catch(() => message.lineReplyNoMention(
          new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor(15158332)
          .setDescription(":x: Database error!")
        ))
      }
    })
  }
  }
}