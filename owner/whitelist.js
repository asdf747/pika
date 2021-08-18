const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const UserInfo = require('../models/whitelist')
const Blacklist = require('../models/blacklist')
const ms = require('ms')
const moment = require('moment')

module.exports = {
  commands: 'whitelist',
  description: 'Whitelists/unwhitelists a user.',
  minArgs: 2,
  expectedArgs: 'add <user> [duration]',
  subCommands: 'remove check',
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.users.first() || client.users.cache.get(arguments[0])
    if(!user) return message.lineReplyNoMention('Invalid user.')
    let whiteliste = await UserInfo.findOne({ id: user.id })
    let blackliste = await Blacklist.findOne({ id: user.id })
    let inGuild = 'true'
    if(!message.guild.member(user)){inGuild = 'false'}
    if('add'.includes(arguments[0].toLowerCase())){
      if(whiteliste) whiteliste.delete()
      if(blackliste) blackliste.delete()
      if(arguments[2]){
        const Expire = ms(arguments[2])
        if(!Expire) return message.lineReplyNoMention("Please specify an expire duration.")
        const expiredate = moment(new Date(Date.now() + Expire)).fromNow()
        new UserInfo({ id: user.id, Expire, Permanent: false }).save()
        .then(() => message.lineReplyNoMention(
          new MessageEmbed()
        .setTitle(":white_check_mark: | Whitelisted user!")
        .setDescription(`**Tag:** ${user.tag}\n**InGuild:** ${inGuild}\n**Expires:** ${expiredate}`)
        .setFooter(`ID: ${user.id}`)
      )
        )
        .catch(() => message.lineReplyNoMention("An error has occured!"))
      } else{
const penis = await UserInfo.findOne({ id: user.id })
        if(penis) penis.delete()
        const Expire = day(arguments[2]).valueOf()
        new UserInfo({ id: user.id, Expire: 0, Permanent: true }).save()
        .then(() => message.lineReplyNoMention(
          new MessageEmbed()
        .setTitle(":white_check_mark: | Whitelisted user!")
        .setDescription(`**Tag:** ${user.tag}\n**InGuild:** ${inGuild}`)
        .setFooter(`ID: ${user.id}`)
      ))
     
    }
    } else if('remove'.includes(arguments[0].toLowerCase())){
      if(!whiteliste) return message.lineReplyNoMention("This user is not whitelisted")
     whiteliste.delete()
      .then(() => message.lineReplyNoMention(
        new MessageEmbed()
        .setTitle("Unwhitelisted user!")
        .setDescription(`**Tag:** ${user.tag}\n**InGuild:** ${inGuild}`)
        .setFooter(`ID: ${user.id}`)
      ))
      .catch(() => message.lineReplyNoMention("Database error!"))
    } else if('check'.includes(arguments[0].toLowerCase())){
      const dot = new Date()
      if(whiteliste) return message.lineReplyNoMention("This user is whitelisted.")
      else if(!whiteliste) return message.lineReplyNoMention("This user is not whitelisted.")
      else if(!whiteliste.Permenant && dot > whiteliste.expire) {
        whiteliste.delete()
        return message.lineReplyNoMention("This user is not whitelisted.")
      }
    } else return message.lineReplyNoMention("Invalid arguments.")
    }
  
}
