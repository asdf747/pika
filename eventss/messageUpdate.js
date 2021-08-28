const Discord = require('discord.js')
require('discord-reply');
const config = require('../config.json')
const fs = require('fs')
const path = require('path')
const db = require('quick.db')
const MessageLogs = require('../models/messagelogs')


module.exports = async (client, oldMessage, newMessage) => {
db.set(`esnipemsg_${newMessage.channel.id}`, oldMessage.content)
    db.set(`esnipesender_${newMessage.channel.id}`, newMessage.author.id)
    let snipes = client.esnipes.get(newMessage.channel.id) || [];
  if(snipes.length > 1) snipes = snipes.slice(0, 1);

  snipes.unshift({
    msg: oldMessage,
    time: Date.now(),
    image: oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null

  });

  client.esnipes.set(newMessage.channel.id, snipes);
  if(newMessage.guild.id === "818876705158594580") return
    if(newMessage.author.bot) return;
    .catch(err => client.channels.cache.get('836514780931162124').send(`**${err}**`))
    let doc = await MessageLogs.findOne({ Guild: newMessage.guild.id })
    if(!doc) return;
    const channel = newMessage.guild.channels.cache.get(doc.Channel)
    if(!channel) return doc.delete()
    let dely2 = new Discord.MessageEmbed()
    .setAuthor(`${newMessage.author.tag}`, `${newMessage.author.avatarURL()}`)
    .setTitle(`Message edited in ${newMessage.channel.name}`)
    .setDescription(`**Before:** ${oldMessage}\n**After:** ${newMessage}`)
    .setFooter(`ID: ${newMessage.author.id}`)
    .setColor("BLUE")
    .setTimestamp()
    channel.send(dely2)
    .catch((err) => console.log(err))
}