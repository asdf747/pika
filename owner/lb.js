const DONOS = require('../models/donations')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'lb',
  description: "Donations leaderboard.",
  callback: async (message, arguments, text, client) => {
    let doc = await DONOS.find({ Guild: message.guild.id })
    if(!doc) return message.channel.send("This server doesn't have any donation logged.")
    let total = 0
    const lb = doc.filter(m => message.guild.members.cache.get(m.User)).sort((a, b) => b.Donations.length - a.Donations.length).map((u, i) => {
      if(total >= 5) return
      if(message.guild.members.cache.get(u.User)){
      total++
      return `\`${i+1}\`. **${message.guild.members.cache.get(u.User).user.tag}** - **${u.Donations.length}** donations.`
      }
    }).join('\n')
    message.channel.send(
      new MessageEmbed()
      .setTitle("Donations leaderboard.")
      .setDescription(lb)
      .setFooter(message.guild.name, message.guild.iconURL())
      .setColor("BLUE")
    )
  }
}