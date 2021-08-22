const BONUS = require('../models/bonus')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'multi',
  callback: async (message, arguments, text, client) => {
    let doc = await BONUS.findOne({ Guild: message.guild.id })
    let roles = ''
    let total = 1
    if(doc && doc.Roles.length) {
      roles = doc.Roles.map((re, i) => {
        if(message.member.roles.cache.some(r => r.id === re.ID)){
          total = total + re.Entry
          return `<@&${re.ID}>: **x${re.Entry}**`
        }
        
      }).join('\n')
    }
    message.channel.send(
      new MessageEmbed()
      .setTitle(`${message.author.tag}'s multiplier`)
      .setDescription(`${roles}\n\nTotal: **x${total}**`)
    )
  }
}