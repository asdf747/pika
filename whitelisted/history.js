const HISTORY = require('../models/history')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
  commands: 'history',
  description: 'Displays the commands history of a user.',
  callback: async (message, arguments, text, client) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]) || message.member

    await HISTORY.findOne({ Guild: message.guild.id, User: member.id }, async(err, data) => {
      if(data){
        let total = 0
        let emo = new MessageEmbed()
          .setAuthor(`${member.user.tag}'s commands history.`, member.user.displayAvatarURL())
        data.Cmds.sort((a, b) => b.Date - a.Date).forEach((cmd, i) => {
          if(total >= 20) return
          total++
          emo.addField(`**${i+1}.** ${cmd.Command}`, `**Arguments:** ${cmd.Args}\n**Date:** \`${moment(cmd.Date).format('l')} [${moment(cmd.Date).fromNow()}]\``)
        })
        emo.setFooter(`${total} out of ${data.Cmds.length}`)
        message.channel.send(emo)
      }if(!data){
        message.channel.send("This user doesn't have any command logged yet.")
      }
    })
  }
}