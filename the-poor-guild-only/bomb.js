const BOMB = require('../models/bomb')
const moment = require('moment')

module.exports = {
  commands: 'bomb',
  minArgs: 1,
  expectedArgs: '<member>',
  callback: async (message, arguments, text, client) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
    if(!member) return message.channel.send(":x: Invalid member.")
    if(member.id === message.author.id) return message.channel.send(":x: You can't bomb yourself.")
    if(member.user.bot) return message.channel.send(":x: You can't bomb a bot.")
    await BOMB.findOne({ Guild: message.guild.id }, async (err, data) => {
      if(data){
        let exists = false
        let time = 0
        let hash = 0
        data.Bombs.forEach((a, i) => {
          if(a.User === member.id) {
            exists = true
            time = moment.duration(new Date - a.Date).as('seconds')
            hash = i
          }
        })
        if(exists && time < 20) return message.channel.send(":x: This member has already been bombed.")
        if(exists && time >= 20) {
          data.Bombs.splice(hash, 1)
          data.save()
        }
        let obj = {
          User: member.id,
          Date: new Date()
        }
        data.Bombs.push(obj)
        data.save()
        message.channel.send(":white_check_mark: This member has been bombed.")
      }if(!data){
        await new BOMB({
          Guild: message.guild.id,
          Bombs: [
            {
              User: member.id,
              Date: new Date()
            }
          ]
        }).save()
        message.channel.send(":white_check_mark: This member has been bombed.")
      }
    })
  }
}

