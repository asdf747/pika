const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['avatar', 'av'],
  description: 'Displays the avatar of the user.',
  callback: async (message, arguments, text, client) => {
    const { guild } = message
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
    let av = member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })
    const avatar = new MessageEmbed()
    .setTitle(`${member.user.username}'s avatar`)
    .setImage(av)
    .setColor(member.displayHexColor)

    message.lineReplyNoMention(avatar)
  }
}