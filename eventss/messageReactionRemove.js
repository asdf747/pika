const Discord = require('discord.js')
require('discord-reply');
const config = require('../config.json')
const fs = require('fs')
const path = require('path')
const db = require('quick.db')
const ReactionLogs = require('../models/reactionlogs')

module.exports = async (client, reaction, user) => {
  if(user.bot) return;
  let chan = await ReactionLogs.findOne({ Guild: reaction.message.guild.id })
  if(!chan) return;
  if(chan.Ignored){
    if(chan.Ignored.includes(`<#${reaction.message.channel.id}>`)) return
  }
  const channel = reaction.message.guild.channels.cache.get(chan.Channel)
  if(!channel) return chan.delete()
  const wc = new Discord.WebhookClient(`${chan.ID}`, `${chan.TOKEN}`)
  if(!wc) return chan.delete()
  let dely = new Discord.MessageEmbed()
  .setAuthor(`${user.tag}`, `${user.avatarURL()}`)
  .setTitle(`Reaction removed in #${reaction.message.channel.name}`)
  .setDescription(`**Reaction:** ${reaction.emoji}\n[message](${reaction.message.url})`)
  .setFooter(`ID: ${user.id}`, `${reaction.message.guild.iconURL()}`)
  .setColor("#dc6044")
  .setTimestamp()
  wc.send(dely2)
  .catch(err => console.log(err))
}