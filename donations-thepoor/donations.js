const sche = require('../models/donations')
const { MessageEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed');
const moment = require('moment')

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
          `\`${i + 1}\` | **Logger:** ${w.Logger}\n**Donation:** ${w.Donation}\nLogged on ${moment(w.Date).format('LLLL')} [${moment(w.Date, "YYYYMMDD").fromNow()}]`
        )
    const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(thing)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(8)
    .setPageIndicator(true)
    .formatField(`${data.Donations.length} donations.`, el => el);

FieldsEmbed.embed
  .setTitle(`${member.user.tag}'${member.user.username.endsWith('s') ? '' : 's'} donation${data.Donations.length !== 1 ? 's' : ''}.`)
  .setColor(65535)
  .setFooter(`ID: ${member.user.id}`)

FieldsEmbed.build();
      } if(!data){
        message.channel.send(
          new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: This user doesn't have any donation logged in this server.`)
          .setColor(15158332)
        )
      }
    })
  }
}