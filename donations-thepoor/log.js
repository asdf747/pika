const sche = require('../models/donations')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'log',
  minArgs: 2,
  type: 'guildonly',
  guildID: '655780171496030240',
  expectedArgs: '<member> <donation>',
  callback: async (message, arguments, text, client) => {
    const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === arguments[0])
    if(!member) return message.channel.send("I can't find this member.")
    let donationn = arguments.slice(1).join(' ')
    sche.findOne({ Guild: message.guild.id, User: member.user.id }, async (err, data) => {
      if(data){
        const obj = {
          Logger: `<@${message.author.id}>`,
          Donation: donationn,
          Date: new Date()
        }
        data.Donations.push(obj)
        data.save()
        await sche.findOneAndUpdate({ Guild: message.guild.id, User: member.user.id }, { $inc: {Amount: 1} })
        message.channel.send(`:white_check_mark: | Your donation has been successfully logged.`)
        message.guild.channels.cache.get('792352517605294090').send(
          new MessageEmbed()
          .setTitle('New Donation Log')
          .setFooter(`Donation System | ${message.guild.name}`)
          .setTimestamp()
          .setThumbnail(message.guild.iconURL())
          .setColor(65535)
          .setDescription(`**Sponsor:** <@${member.id}> \`${member.user.tag} | ID: ${member.user.id}\`\n**Donation:** ${donationn}\n**Logger:** <@${message.author.id}> \`${message.author.tag} | ID: ${message.author.id}\`\n**Message:** [Click here](${message.url})`)
        )
      } if(!data){
        let doccReate = await new sche({
          Guild: message.guild.id,
          User: member.user.id,
          Amount: 1,
          Donations: [
            {
          Logger: `<@${message.author.id}>`,
          Donation: donationn,
          Date: new Date()
            }
          ]
        })
        doccReate.save()
        message.channel.send(`:white_check_mark: | Your donation has been successfully logged.`)
        message.guild.channels.cache.get('792352517605294090').send(
          new MessageEmbed()
          .setTitle('New Donation Log')
          .setFooter(`Donation System | ${message.guild.name}`)
          .setTimestamp()
          .setThumbnail(message.guild.iconURL())
          .setColor(65535)
          .setDescription(`**Sponsor:** <@${member.id}> \`${member.user.tag} | ID: ${member.user.id}\`\n**Donation:** ${donationn}\n**Logger:** <@${message.author.id}> \`${message.author.tag} | ID: ${message.author.id}\`\n**Message:** [Click here](${message.url})`)
        )
      }
    })
  }
}