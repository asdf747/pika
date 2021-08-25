const HL = require('../models/highlight')
const Pagination = require('discord-paginationembed')

module.exports = {
  commands: ['highlight', 'hl'],
  minArgs: 1,
  expectedArgs: 'add [word]',
  subCommands: 'remove ignore list',
  callback: async (message, arguments, text, client) => {
    if(arguments[0].toLowerCase() === 'add'){
      const Word = arguments.slice(1).join(' ')
      if(!Word) return message.channel.send("Please specify a word.")
      await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          let kas = false
          data.Hls.filter(l => l.Owner === message.author.id).map((v, i) => {
            if(v.Word.toLowerCase() === Word.toLowerCase() && v.Owner === message.author.id) kas = true
          })
          if(kas) return message.channel.send("This is already highlighted.")
          let obj = {
            Word,
            Owner: message.author.id
          }
          data.Hls.push(obj)
          data.save()
          message.channel.send(`:white_check_mark: | Added ${Word} to your highlights.`)
        }if(!data){
          await new HL({
            Guild: message.guild.id,
            Hls: [
              {
                Word,
                Owner: message.author.id
              }
            ]
          }).save()
          message.channel.send(`:white_check_mark: | Added ${Word} to your highlights.`)
        }
      })
    }else if(arguments[0].toLowerCase() === 'remove'){
      const Word = arguments.slice(1).join(' ')
      if(!Word) return message.channel.send("Please specify a word.")
      await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          let jas = false
          let numo = 0
          data.Hls.map((v, i) => {
            if(v.Word.toLowerCase() === Word.toLowerCase() && v.Owner === message.author.id) {
              jas = true
              numo = i
              data.Hls.splice(i, 1)
          data.save()
              }
          })
          if(jas){
          
          message.channel.send(`:white_check_mark: | Removed ${Word} from your highlights.`)
          }
          if(!jas) return message.channel.send("This word isn't highlighted.")
        }if(!data){
          message.channel.send("You don't have any highlights.")
        }
      })
    }else if(arguments[0].toLowerCase() === 'list'){
      await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          const list = data.Hls.filter(ass => ass.Owner === message.author.id).map((e, i) => `${e.Word}`)
          if(!list.length) return message.channel.send("You don't have anything highlighted.")
          const ignoreuser = data.IgnoredUsers.filter(ass => ass.Owner === message.author.id).map((e, i) => `<@${e.ID}>`)
          const ignorechannel = data.IgnoredChannels.filter(ass => ass.Owner === message.author.id).map((e, i) => `<#${e.ID}>`)
          const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(list)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(25)
    .setPageIndicator(true)
    .formatField('List: ', el => el);

FieldsEmbed.embed
  .setTitle("Highlights")

  if(ignoreuser.length) FieldsEmbed.embed
  .addField('Ignored users', ignoreuser)

  if(ignorechannel.length) FieldsEmbed.embed
  .addField('Ignored channels', ignorechannel)

FieldsEmbed.build();
        }if(!data){
          message.channel.send("You don't have anything highlighted.")
        }
      })
    }else if(arguments[0].toLowerCase() === 'ignore'){
      let type = 'member'
      let thing = message.mentions.members.first() || message.guild.members.cache.get(arguments[1])
      if(!thing){
        type = 'channel'
        thing = message.mentions.channels.first() || message.guild.channels.cache.get(arguments[1])
      }
      if(!thing) return message.channel.send('Invalid argument.')
      if(type === 'member'){
        await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
          
          if(data){
            let las = false
            data.IgnoredUsers.filter(e => e.Owner === message.author.id).map((v, i) => {
              if(v.ID === thing.id) las = true
            })
            if(las) return message.channel.send("You're already ignoring this member.")
            let obj = {
              ID: thing.id,
              Owner: message.author.id
            }
            data.IgnoredUsers.push(obj)
            data.save()
            message.channel.send(`:white_check_mark: | Ignored **${thing.user.tag}**`)
          }if(!data){
            await new HL({
              Guild: message.guild.id,
              IgnoredUsers: [
                {
                  ID: thing.id,
                  Owner: message.author.id
                }
              ]
            }).save()
            message.channel.send(`:white_check_mark: | Ignored **${thing.user.tag}**`)
          }
        })
      }else if(type === 'channel'){
        await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data){
            let las = false
            data.IgnoredChannels.filter(e => e.Owner === message.author.id).map((v, i) => {
              if(v.ID === thing.id) las = true
            })
            if(las) return message.channel.send("You're already ignoring this channel.")
            let obj = {
              ID: thing.id,
              Owner: message.author.id
            }
            data.IgnoredChannels.push(obj)
            data.save()
            message.channel.send(`:white_check_mark: | Ignored **#${thing.name}**`)
          }if(!data){
            await new HL({
              Guild: message.guild.id,
              IgnoredChannels: [
                {
                  ID: thing.id,
                  Owner: message.author.id
                }
              ]
            }).save()
            message.channel.send(`:white_check_mark: | Ignored **#${thing.name}**`)
          }
        })
      }
    }else if(arguments[0].toLowerCase() === 'unignore'){
let type = 'member'
      let thing = message.mentions.members.first() || message.guild.members.cache.get(arguments[1])
      if(!thing){
        type = 'channel'
        thing = message.mentions.channels.first() || message.guild.channels.cache.get(arguments[1])
      }
      if(!thing) return message.channel.send('Invalid argument.')
      if(type === 'member'){
        await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data){
            let igo = data.IgnoredUsers.filter(v => v.Owner === message.author.id)
            if(!igo.length) return message.channel.send('You\'re not ignoring any member.')
            let her = false
            data.IgnoredUsers.map((v, i) => {
              if(v.ID === thing.id && v.Owner === message.author.id) {
                her = true
                data.IgnoredUsers.splice(i, 1)
                data.save()
              }
            })
            if(!her) return message.channel.send("You're not ignoring this member.")
            if(her) message.channel.send(`:white_check_mark: | Unignored **${thing.user.tag}**`)
          }if(!data){
            message.channel.send('You\'re not ignoring any member.')
          }
        })
      }
      if(type === 'channel'){
        await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data){
            let igo = data.IgnoredChannels.filter(v => v.Owner === message.author.id)
            if(!igo.length) return message.channel.send('You\'re not ignoring any channel.')
            let her = false
            data.IgnoredChannels.map((v, i) => {
              if(v.ID === thing.id && v.Owner === message.author.id) {
                her = true
                data.IgnoredChannels.splice(i, 1)
                data.save()
              }
            })
            if(!her) return message.channel.send("You're not ignoring this channel.")
            if(her) message.channel.send(`:white_check_mark: | Unignored **#${thing.name}**`)
          }if(!data){
            message.channel.send('You\'re not ignoring any channel.')
          }
        })
      }
    }else {
    
      const Word = arguments.slice(0).join(' ')
      if(!Word) return message.channel.send("Please specify a word.")
      await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          let kas = false
          data.Hls.filter(a => a.Owner === message.author.id).map((v, i) => {
            if(v.Word.toLowerCase() === Word.toLowerCase()) kas = true
          })
          if(kas) return message.channel.send("This is already highlighted.")
          let obj = {
            Word,
            Owner: message.author.id
          }
          data.Hls.push(obj)
          data.save()
          message.channel.send(`:white_check_mark: | Added ${Word} to your highlights.`)
        }if(!data){
          await new HL({
            Guild: message.guild.id,
            Hls: [
              {
                Word,
                Owner: message.author.id
              }
            ]
          }).save()
          message.channel.send(`:white_check_mark: | Added ${Word} to your highlights.`)
        }
      })
    }
  }
}