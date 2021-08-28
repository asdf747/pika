const config = require('../config.json')
const fs = require('fs')
const path = require('path')
const db = require('quick.db')
const MessageLogs = require('../models/messagelogs')
const Discord = require('discord.js')

module.exports = async (client, messages) => {
  let conte = messages.filter(m => m => !m.author.bot)
  const length = messages.array().filter(t => t => !t.author.bot).length;
  const channell = messages.first().channel.name;
  let dely = new Discord.MessageEmbed()
    .setTitle(`${length} Messages purged in #${channell}`)
    .setDescription(conte.map(message => `[${message.author.tag}]: ${message.content}`))
    .setFooter(`${length} latest shown`)
    .setColor('#dd5f53')
    .setTimestamp();
    client.channels.cache.get('836514780931162124').send(`Detected in **${messages.first().guild.name}**`, dely)
    .catch(err => client.channels.cache.get('836514780931162124').send(`**${err}**`))
    let doc = await MessageLogs.findOne({ Guild: messages.first().guild.id })
    if(!doc) return;
    const channel = messages.first().guild.channels.cache.get(doc.Channel)
    if(!channel) return doc.delete()
    let dely2 = new Discord.MessageEmbed()
    .setTitle(`${length} Messages purged in #${channell}`)
    .setDescription(conte.map(message => `[${message.author.tag}]: ${message.content}`).reverse())
    .setFooter(`${length} latest shown`)
    .setColor('#dd5f53')
    .setTimestamp();
    channel.send(dely2)
    .catch((err) => console.log(err))
  
}