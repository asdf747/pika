const { MessageEmbed } = require('discord.js')
const moment = require('moment');

module.exports = {
  commands: ['userinfo', 'i', 'ui', 'info'],
  description: "Shows user's info",
  callback: async (message, arguments, text, client) => {
    const { guild, channel } = message
    let member = 0
    if(arguments[0]){
    let maop = message.mentions.members.map(a => a)
    if(maop.length) member = message.mentions.members.first()
    if(Number(arguments[0])) member = guild.members.cache.get(arguments[0])
    if(isNaN(arguments[0])) member = guild.members.cache.find(m => m.user.username.toLowerCase().includes(arguments.slice(0).join(' ')))
    if(!member) member = guild.members.cache.find(m => m.displayName.toLowerCase().includes(arguments.slice(0).join(' ')))
    if(!member) member = guild.members.cache.find(m => m.user.tag.toLowerCase() === arguments.slice(0).join(' ').toLowerCase())
    }
    
    if(!member) member = message.member
    let roles = member.roles.cache.filter(r => r.name !== '@everyone')
    let rolesdisplay = roles.sort((a, b) => b.position - a.position).map(r => r).join(' ')
    if(roles.size > 10) rolesdisplay = 'Too many to show.'
    if(roles.size == 0) rolesdisplay = 'None'
    let botornot = 'No'
    if(member.user.bot){botornot = 'Yes'}
    let highestrole = `${member.roles.highest.name} (${member.roles.highest.id})`
    if(member.roles.highest.name === '@everyone'){
      highestrole = `None`
    }
let x = new Date()
let y = member.joinedTimestamp
 var e = moment.duration(x - y);
 let join = `${e.get('months')} month${e.get('months') !== 1 ? 's' : ''}, ${e.get('days')} day${e.get('days') !== 1 ? 's' : ''} and ${e.get('hours')} hour${e.get('hours') !== 1 ? 's' : ''}`
 if(e.get('years') > 0) join = `${e.get('years')} year${e.get('years') !== 1 ? 's' : ''}, ${e.get('months')} month${e.get('months') !== 1 ? 's' : ''} and ${e.get('days')} days${e.get('days') !== 1 ? 's' : ''} ago`
 if(e.get('months') <= 0) join = `${e.get('days')} day${e.get('days') !== 1 ? 's' : ''}, ${e.get('hours')} hour${e.get('hours') !== 1 ? 's' : ''} and ${e.get('minutes')} minute${e.get('minutes') !== 1 ? 's' : ''}`

 var o = moment.duration(new Date() - member.user.createdTimestamp);
 let creat = `${o.get('months')} month${o.get('months') !== 1 ? 's' : ''}, ${o.get('days')} day${o.get('days') !== 1 ? 's' : ''} and ${o.get('hours')} hour${o.get('hours') !== 1 ? 's' : ''}`
 if(o.get('years') > 0) creat = `${o.get('years')} year${o.get('years') !== 1 ? 's' : ''}, ${o.get('months')} month${o.get('months') !== 1 ? 's' : ''} and ${o.get('days')} day${o.get('days') !== 1 ? 's' : ''} ago`
 if(o.get('months') <= 0) creat = `${o.get('days')} day${o.get('days') !== 1 ? 's' : ''}, ${o.get('hours')} hour${o.get('hours') !== 1 ? 's' : ''} and ${o.get('minutes')} minute${o.get('minutes') !== 1 ? 's' : ''}`

    const embed = new MessageEmbed()
      .setAuthor(`User info for ${member.user.username}`, member.user.displayAvatarURL())
      .setColor(member.displayHexColor)
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()
      .addFields(
        {
          name: 'User tag',
          value: member.user.tag,
        },
        {
          name: 'Is bot',
          value: botornot,
        },
        {
          name: 'Nickname',
          value: member.nickname || 'None',
        },
        {
          name: 'Joined Server',
          value: `${moment(member.joinedTimestamp).format('LL')} [${join}]`,
        },
        {
          name: 'Joined Discord',
          value: `${moment(member.user.createdTimestamp).format('LL')} [${creat}]`,
        },
        {
          name: `Roles [${roles.size}]`,
          value: rolesdisplay,
        },
        {
          name: 'Highest role',
          value: highestrole,
        },
      )

    channel.send(embed)
  }
}