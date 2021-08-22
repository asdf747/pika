const db = require('quick.db')
const ReactionLogs = require('../models/reactionlogs')
const { MessageEmbed, WebhookClient } = require('discord.js')
const Pagination = require('discord-paginationembed')

module.exports = {
  commands: ['reactionlogs', 'reactionlog'],
  description: 'Sets the channel for reaction logs.',
  permissions: 'BAN_MEMBERS',
  permissionError: "You can't run this command.",
  minArgs: 1,
  expectedArgs: '<set/ignore/unignore> [channel/none]',
  callback: async (message, arguments, text, client) => {
    
    if('set'.includes(arguments[0].toLowerCase())){
      let channel = message.guild.channels.cache.get(arguments[1])
    if(arguments[1].startsWith('<#')){
      if(arguments[1].endsWith('>')){
      let channelid = arguments[1].replace('<#', '').replace('>', '')
       channel = message.guild.channels.cache.get(channelid)
      }
    }
      if(!arguments[1]) return message.lineReply("Please specify a channel.")
      
      if(arguments[1].toLowerCase() === "none"){
        let channel = message.guild.channels.cache.get(arguments[1])
    if(arguments[1].startsWith('<#')){
      if(arguments[1].endsWith('>')){
      let channelid = arguments[1].replace('<#', '').replace('>', '')
       channel = message.guild.channels.cache.get(channelid)
      }
    }
      let doc = await ReactionLogs.findOne({ Guild: message.guild.id })
      if(!doc) return message.channel.send("There is no channel set.")
      let col = new WebhookClient(`${doc.ID}`, `${doc.TOKEN}`)
      doc.delete()
      col.delete()
      message.channel.send(`Removed the reaction logs channel.`)
    } else{
      let channel = message.guild.channels.cache.get(arguments[1])
    if(arguments[1].startsWith('<#')){
      if(arguments[1].endsWith('>')){
      channelid = arguments[1].replace('<#', '').replace('>', '')
       channel = message.guild.channels.cache.get(channelid)
      }
    }
      if(!channel) return message.lineReplyNoMention("This channel doesn't exist.")
      await ReactionLogs.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          let gaos = new WebhookClient(`${data.ID}`, `${data.TOKEN}`)
          if(gaos) gaos.delete()
          channel.createWebhook('Pika reaction logging', {
            avatar: client.user.displayAvatarURL()
          }).then(async webhook => {
            await ReactionLogs.findOneAndUpdate({ Guild: message.guild.id }, { $set: {Channel: channel.id, ID: `${webhook.id}`, TOKEN: `${webhook.token}`} })
            message.channel.send(
              new MessageEmbed()
              .setTitle("Set reaction logs channel.")
              .setDescription(`**Channel:** <#${channel.id}>`)
              .setFooter(`ID: ${channel.id}`)
            )
          })
          
        } else if(!data){
          channel.createWebhook('Pika reaction logging', {
            avatar: client.user.displayAvatarURL()
          }).then(async webhook => {
            await new ReactionLogs({
              Guild: message.guild.id,
              Channel: channel.id,
              IgnoredCount: 0,
              ID: `${webhook.id}`,
              TOKEN: `${webhook.token}`
            }).save()
            message.channel.send(
              new MessageEmbed()
              .setTitle("Set reaction logs channel.")
              .setDescription(`**Channel:** <#${channel.id}>`)
              .setFooter(`ID: ${channel.id}`)
            )
          })
         
        }
      })
    } 
  }else if('ignore'.includes(arguments[0].toLowerCase())){
      
       if(arguments[1]){
         let channel = message.guild.channels.cache.get(arguments[1])
    if(arguments[1].startsWith('<#')){
      if(arguments[1].endsWith('>')){
      let channelid = arguments[1].replace('<#', '').replace('>', '')
       channel = message.guild.channels.cache.get(channelid)
      }
    }
        await ReactionLogs.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data){
            if(data.IgnoredCount >= 10) return message.channel.send("You can only ignore 10 channels.")
            if(data.Ignored.includes(`<#${channel.id}>`)) return message.channel.send("This channel is already ignored.")
            data.Ignored.push(`<#${channel.id}>`)
            data.save()
            await ReactionLogs.findOneAndUpdate({ Guild: message.guild.id }, { $inc: {IgnoredCount: 1} })
            .then(() => message.channel.send(`Ignored **#${channel.name}**`))
            .catch((err) => message.channel.send(
              new MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setColor(15158332)
              .setDescription(`:x: An error has occured!\n\n\`${err}\``)
            ))
          } else if(!data){
            await new ReactionLogs({
              Guild: message.guild.id,
              IgnoredCount: 1,
              Ignored: `<#${channel.id}>`
            }).save()
            message.channel.send(`Ignored **#${channel.name}**`)
          }
        })
        return
      }
      let doc = await ReactionLogs.findOne({ Guild: message.guild.id })
      if(!doc) return message.lineReplyNoMention("There are no ignored channels.")
      let ignores = doc.Ignored
      if(ignores.join(', ') === '') return message.channel.send("There are no ignored channels.")
      const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(doc.Ignored)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(8)
    .setPageIndicator(true)
    .formatField('List: ', el => el);

FieldsEmbed.embed
  .setTitle("Ignored channels.")

FieldsEmbed.build();
    } else if('unignore'.includes(arguments[0].toLowerCase())){
      if(!arguments[1]) return message.lineReply("Please specify a channel")
      let channel = message.guild.channels.cache.get(arguments[1])
    if(arguments[1].startsWith('<#')){
      if(arguments[1].endsWith('>')){
      let channelid = arguments[1].replace('<#', '').replace('>', '')
       channel = message.guild.channels.cache.get(channelid)
      }
    }
    if(!channel) return message.channel.send(
      new MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setColor(15158332)
              .setDescription(`:x: This channel doesn't exist.`)
    )
    await ReactionLogs.findOne({ Guild: message.guild.id }, async (err, data) => {
      if(data){
          if(!data.Ignored.includes(`<#${channel.id}>`)) return message.channel.send("This channel isn't ignored.")
          if(data.Ignored.join(", ") === '') return message.channel.send("There are no ignored channels.")
        const filtered = data.Ignored.filter((target) => target !== `<#${channel.id}>`)
        await ReactionLogs.findOneAndUpdate({ Guild: message.guild.id }, { $inc: {IgnoredCount: -1} })
        await ReactionLogs.findOneAndUpdate({ Guild: message.guild.id }, { $set: {Ignored: filtered} })
        .then(() => message.channel.send(`Unignored **#${channel.name}**`))
        .catch((err) => message.channel.send(
          new MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setColor(15158332)
              .setDescription(`:x: An error has occured!\n\n\`${err}\``)
        ))

      } else if(!data){
        message.channel.send("There are no ignored channels.")
      }
    })

    } else return message.lineReplyNoMention("Invalid arguments.")
      
    }
    
        
        
  }
