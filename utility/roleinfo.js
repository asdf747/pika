const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const db = require('quick.db')
const config = require('../config.json')


module.exports = {
  commands: ['role info', 'ri'],
  permissions: "MANAGE_ROLES",
  callback: async (message, arguments, text, client) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(message.content.split(' ')[0] === `${prefix}role`  && arguments[0] === 'info' && !arguments[1]) return message.channel.send("Please enter a role.")
    if(prefix === null) prefix = config.prefix
    let gg = 1
    if(message.content.split(' ')[0].toLowerCase() === `${prefix}ri`) gg = 0
    if(!arguments[gg]) return message.channel.send("Please enter a role.")
    let role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(arguments.slice(gg).join(' ').toLowerCase()))
    if(Number(arguments[1])){
      role = message.guild.roles.cache.find(r => r.id === arguments[gg])
    }
    if(arguments[gg].startsWith('<@&')){
      if(arguments[gg].endsWith('>')){
        let num = arguments[gg].replace('<@&', '').replace('>', '')
        role = message.guild.roles.cache.find(r => r.id === num)
      }
    }
    if(!role) return message.channel.send(
      new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor(15158332)
      .setDescription(`:x: I can't find this role.`)
    )

let x = new Date()
let y = role.createdTimestamp
 var e = moment.duration(x - y);
 let duration = `${e.get('months')} month${e.get('months') !== 1 ? 's' : ''}, ${e.get('days')} day${e.get('days') !== 1 ? 's' : ''} and ${e.get('hours')} hour${e.get('hours') !== 1 ? 's' : ''} ago `
 if(e.get('years') > 0) duration = `${e.get('years')} year${e.get('years') !== 1 ? 's' : ''}, ${e.get('months')} month${e.get('months') !== 1 ? 's' : ''} and ${e.get('days')} day${e.get('days') !== 1 ? 's' : ''} ago`

    message.channel.send(
      new MessageEmbed()
      .setTitle("Role info")
      .setDescription(`**Name:** ${role.name}\n**Members:** ${role.members.size}\n**Position:** ${role.position}\n**Color:** ${role.hexColor}\nCreated ${duration}`)
      .setFooter(`ID: ${role.id}`)
      .setColor(role.hexColor)
    )
    
  }
}