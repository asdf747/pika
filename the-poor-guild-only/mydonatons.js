const sche = require('../models/donations')
const { MessageEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed');
const moment = require('moment')

module.exports = {
  commands: ['mydonations', 'mydonation', 'mydonos', 'mydono'],
  type: 'guildonly',
  guildID: '655780171496030240',
  callback: async (message, arguments, text, client) => {
    const member = message.member
    
    sche.findOne({ Guild: message.guild.id, User: member.user.id }, async (err, data) => {
      if(data){
        if(!data.Donations.length) return message.channel.send( new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: You don't have any donation logged in this server.`)
          .setColor(15158332))
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
  .setTitle(`${member.user.tag}'s donations.`)
  .setColor(65535)
  .setFooter(`ID: ${member.user.id}`)

FieldsEmbed.build();
      } if(!data){
        message.channel.send( new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(`:x: You don't have any donation logged in this server.`)
          .setColor(15158332))
      }
    })
  }
}