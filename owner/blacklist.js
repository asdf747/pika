const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const UserInfo = require('../models/whitelist')
const Blacklist = require('../models/blacklist')
const day = require('dayjs')
const moment = require('moment')

module.exports = {
  commands: ['blacklist', 'bl'],
  description: 'Bans a user from using the bot.',
  minArgs: 2,
  expectedArgs: 'add/remove/check <user> <duration> [reason]',
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.users.first() || client.users.cache.get(arguments[0])
    if(!user) return message.lineReplyNoMention('Invalid user.')
    let whiteliste = await UserInfo.findOne({ id: user.id })
    let blackliste = await Blacklist.findOne({ id: user.id })
    let reason = arguments.slice(3).join(" ")
    if(!reason){reason = 'None'}
    let inGuild = 'true'
    if(!message.guild.member(user)){inGuild = 'false'}
    if('add'.includes(arguments[0].toLowerCase())){
      if(!arguments[1]) return message.channel.send(
        new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: Please specify an expiry date.`)
          .setColor(15158332)
      )
      if(whiteliste) whiteliste.delete()
      if(blackliste) blackliste.delete()
        const Expire = day(arguments[2]).valueOf()
        if(!Expire) return message.lineReplyNoMention(new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: Please specify an expiry date.`)
          .setColor(15158332))
        const expiredate = moment(Expire).fromNow()
        new Blacklist({ id: user.id, reason, Expire }).save()
        .then(() => message.lineReplyNoMention(
          new MessageEmbed()
        .setTitle(":white_check_mark: | Blacklisted user!")
        .setDescription(`**Tag:** ${user.tag}\n**InGuild:** ${inGuild}\n**Reason:** ${reason}\n**Ends:** ${expiredate}`)
        .setFooter(`ID: ${user.id}`)
      )
        )
        .catch((err) => message.lineReplyNoMention(
          new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: an error has occured!\n\n\`${err}\``)
          .setColor(15158332)
        ))

    } else if('remove'.includes(arguments[0].toLowerCase())){
      if(!blackliste) return message.lineReplyNoMention("This user is not blacklisted")
     blackliste.delete()
      .then(() => message.lineReplyNoMention(
        new MessageEmbed()
        .setTitle(":white_check_mark: | Unblacklisted user!")
        .setDescription(`**Tag:** ${user.tag}\n**InGuild:** ${inGuild}`)
        .setFooter(`ID: ${user.id}`)
      ))
      .catch((err) => message.lineReplyNoMention(
        new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: an error has occured!\n\n\`${err}\``)
          .setColor(15158332)
      ))
    } else if('check'.includes(arguments[0].toLowerCase())){
      const dot = new Date()
      if(blackliste) return message.lineReplyNoMention("This user is blacklisted.")
      else if(!blackliste) return message.lineReplyNoMention("This user is not blacklisted.")
      else if(!blackliste.Permenant && dot > whiteliste.expire) {
        blackliste.delete()
        return message.lineReplyNoMention("This user is not blacklisted.")
      }
    } else return message.lineReplyNoMention(new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: Invalid arguments.`)
          .setColor(15158332))
    }
  
}
