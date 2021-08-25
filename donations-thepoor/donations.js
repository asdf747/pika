const sche = require('../models/donations')
const { MessageEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed');
const moment = require('moment')
const { embedPages } = require('../funcs')

module.exports = {
  commands: ['donations', 'dono'],
  minArgs: 1,
  type: 'guildonly',
  guildID: '655780171496030240',
  expectedArgs: '<member>',
  callback: async (message, arguments, text, client) => {
    const { guild } = message
    let member = message.guild.members.cache.find(m => m.id === arguments[0])
    if(!Number(arguments[0])) member = guild.members.cache.find(m => m.user.username.toLowerCase().includes(arguments.slice(0).join(' ')))
    if(!member) member = guild.members.cache.find(m => m.displayName.toLowerCase().includes(arguments.slice(0).join(' ')))
    if(!member) member = message.mentions.members.first()
    if(!member) return message.channel.send("I can't find this member.")
    
    sche.findOne({ Guild: message.guild.id, User: member.user.id }, async (err, data) => {
      if(data){
        if(!data.Donations.length) return message.channel.send(
          new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: This user doesn't have any donation logged in this server.`)
          .setColor(15158332)
        )
        const thing = data.Donations.map(
          (w, i) => 
          `**${i + 1}. Logger:** ${w.Logger}\n**Donation:** ${w.Donation}\nLogged on ${moment(w.Date).format('LLLL')} [${moment(w.Date, "YYYYMMDD").fromNow()}]`
        )
        let options = {
          perPage: 7,
          joinBy: '\n\n',
          header: `${data.Donations.length} donation${data.Donations.length !== 1 ? 's' : ''}.`,
          title: `${member.user.tag}'s donations.`,
          footer: `ID: ${member.user.id}`,
          color: "BLUE"
        }
        embedPages(client, message, thing, options)
      } if(!data){
        message.channel.send(
          new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setTitle("No donations yet")
          .setDescription(`:x: This user doesn't have any donation logged in this server.`)
          .setColor(15158332)
        )
      }
    })
  }
}