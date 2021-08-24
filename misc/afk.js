const AFK = require('../models/afks')
const Pagination = require('discord-paginationembed')
const moment = require('moment')

module.exports = {
  commands: 'afk',
  subCommands: 'clear list set',
  callback: async (message, arguments, text, client) => {
    if(arguments[0] && arguments[0].toLowerCase() === 'set'){
      let msg = 'AFK'
      if(arguments[1]) msg = arguments.slice(1).join(' ')
  
      await AFK.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          let exi = false
          data.Afks.map(m => {
            if(m.User === message.author.id) exi = true
          })
          if(exi) return
          let obj = {
            User: message.author.id,
            Date: new Date(),
            Msg: msg
          }
          data.Afks.push(obj)
          data.save()
          if(message.member.roles.highest.position < message.guild.me.roles.highest.position && message.member.displayName.length <= 26) message.member.setNickname(`[AFK] ${message.member.displayName}`)
          message.channel.send(`${message.author} I set your AFK: ${msg}`)
        }if(!data){
        await new AFK({
          Guild: message.guild.id,
          Afks: [
            {
              User: message.author.id,
              Date: new Date(),
              Msg: msg
            }
          ]
        }).save()
        if(message.member.roles.highest.position < message.guild.me.roles.highest.position && message.member.displayName.length <= 26) message.member.setNickname(`[AFK] ${message.member.displayName}`)
        message.channel.send(`${message.author} I set your AFK: ${msg}`)
        }
      })
      return
    }
    if(arguments[0] && arguments[0].toLowerCase() === 'list'){
      if(!message.member.hasPermission('ADMINISTRATOR')) return
      await AFK.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          if(!data.Afks.length) return message.channel.send('There are no afk members.')
            let members = data.Afks.map((u, i) => {
              let userafk = `${message.guild.members.cache.get(u.User).user.tag} (${u.User})`
              if(!message.guild.members.cache.get(u.User).id) userafk = u.User
              return `\`${i+1}\` **${userafk}**\n${u.Msg} - ${moment(u.Date).fromNow()}`
            })

            const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(members)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(8)
    .setPageIndicator(true)
    .formatField(`${data.Afks.length} member${data.Afks.length !== 1 ? 's' : ''}.`, el => el);

FieldsEmbed.embed
  .setTitle(`Afk list`)
  .setColor(65535)
  .setTimestamp()

FieldsEmbed.build();
        }if(!data){
          message.channel.send('There are no afk members.')
        }
      })
      return
    }
    if(arguments[0] && arguments[0].toLowerCase() === 'clear'){
      if(!message.member.hasPermission('ADMINISTRATOR')) return
      let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[1])
      if(!member) return message.channel.send("This member doesn't exist.")
      await AFK.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          let has = false
          let num = 0
          data.Afks.map((m, i) => {
            if(m.User === member.id) {
              has = true
              num = i
            }
          })
          if(!has) return message.channel.send("This user doesn't have an afk on")
          data.Afks.splice(num, 1)
          data.save()
          let nicko = member.displayName.replace('[AFK]', '')
          if(message.guild.me.roles.highest.position > member.roles.highest.position) member.setNickname(nicko)
          message.channel.send(`I removed **${member.user.tag}'s** afk.`)
        }if(!data){
          message.channel.send("This user doesn't have an afk on")
        }
      })
      return
    }
    let msg = 'AFK'
    if(arguments[0]) msg = arguments.slice(0).join(' ')

    await AFK.findOne({ Guild: message.guild.id }, async (err, data) => {
      if(data){
        let exi = false
        data.Afks.map(m => {
          if(m.User === message.author.id) exi = true
        })
        if(exi) return
        let obj = {
          User: message.author.id,
          Date: new Date(),
          Msg: msg
        }
        data.Afks.push(obj)
        data.save()
        if(message.member.roles.highest.position < message.guild.me.roles.highest.position) message.member.setNickname(`[AFK] ${message.member.displayName}`)
        message.channel.send(`${message.author} I set your AFK: ${msg}`)
      }if(!data){
      await new AFK({
        Guild: message.guild.id,
        Afks: [
          {
            User: message.author.id,
            Date: new Date(),
            Msg: msg
          }
        ]
      }).save()
      if(message.member.roles.highest.position < message.guild.me.roles.highest.position) message.member.setNickname(`[AFK] ${message.member.displayName}`)
      message.channel.send(`${message.author} I set your AFK: ${msg}`)
      }
    })
  }
}