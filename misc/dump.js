const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Pagination = require('discord-paginationembed')

module.exports = {
  commands: ['dump'],
  permissions: "MANAGE_ROLES",
  minArgs: 1,
  expectedArgs: '<role>',
  permissionsbot: "MANAGE_ROLES",
  description: 'Displays members who has the role.',
  callback: async (message, arguments, text, client) => {
  const givrole1 = arguments.slice(0).join(" ");
     let role1 = message.guild.roles.cache.find(r => r.id === arguments[0])
     if(isNaN(arguments[0])){role1 = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(givrole1.toLowerCase()))}
     if(arguments[0].startsWith('<@&')){
       const num = arguments[0].replace('<@&','').replace('>','')
       role1 = message.guild.roles.cache.find(r => r.id == num)
     }
  if(!role1) return message.lineReplyNoMention(
    new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(15158332)
    .setDescription(`:x: This role doesn't exist.`)
  )
  let aroy = role1.members.sort((a, b) => b.user.username - a.user.username).map(r => `${r.user.tag} (${r.id}) [Nickname: ${r.nickname || 'None'}]`)
  if(!aroy.length) return message.channel.send('Nobody has this role yet.')
const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(aroy)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(13)
    .setPageIndicator(true)
    .formatField(`${role1.members.size} members.`, el => el);

FieldsEmbed.embed
.setColor(role1.hexColor)


FieldsEmbed.build();


  }
}
  
