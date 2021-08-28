const Discord = require('discord.js')

require('discord-reply');
const config = require('../config.json')
const fs = require('fs')
const path = require('path')
const db = require('quick.db')
const MessageLogs = require('../models/messagelogs')

module.exports = async (client, message) => {
  
  if(message.image){
    db.set(`snipemsg_${message.channel.id}`, message.image.url)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
  }
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
    let snipes = client.snipes.get(message.channel.id) || [];
  if(snipes.length > 1) snipes = snipes.slice(0, 1);

  snipes.unshift({
    msg: message,
    time: Date.now(),
    image: message.attachments.first() ? message.attachments.first().proxyURL : null

  });

  client.snipes.set(message.channel.id, snipes);
    if(message.author.bot) return;
    let doc = await MessageLogs.findOne({ Guild: message.guild.id })
    if(!doc) return;
    const channel = message.guild.channels.cache.get(doc.Channel)
    if(!channel) return doc.delete()
    let dely2 = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
    .setTitle(`Message deleted in #${message.channel.name}`)
    .setDescription(`${message.content}`)
    .setFooter(`ID: ${message.author.id}`)
    .setColor("RED")
    .setImage(message.attachments.first() ? message.attachments.first().proxyURL : null)
    .setTimestamp()
    channel.send(dely2)
    .catch((err) => console.log(err))

}