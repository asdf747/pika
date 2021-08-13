const Lockdown = require('../models/lockdown')
const { MessageEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed')
const config = require('../config.json')
const db = require('quick.db')

module.exports = {
  commands: ['lockdown', 'ld'],
  permissions: "MANAGE_CHANNELS",
  callback: async (message, arguments, text, client) => {
    let prefixx = await db.fetch(`prefix_${message.guild.id}`)
    if(prefixx === null){prefixx = config.prefix}
    const lockdownmsg = ['lockmessage', 'lockmsg', 'lock-message', 'lock-msg']
    const unlockdownmsg = ['unlockmessage', 'unlockmsg', 'unlock-message', 'unlock-msg']
if(!arguments[0]){

      await Lockdown.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          
          if(!data.Channels.length) return message.channel.send(`There are no channels added! Use \`${prefixx}lockdown add <channel>\`.`)
          if(data.Locked) return message.channel.send("The server is already locked down.")

          const filter = x => {
            return (x.author.id === message.author.id)
          }
          const msg = await message.channel.send("Are you sure you want to lockdown the server?")
          const verify = await message.channel.awaitMessages(filter, {max: 1, time: 10000});

          if(!verify.size) return message.channel.send("Timeout.")

          let choice = verify.first().content.toLowerCase()
          if(choice === 'yes') console.log('ass')
          else if(choice === 'no') return
          else return message.channel.send('Invalid option')

          
          data.Channels.map(async (c, i) => {
            let cc = message.guild.channels.cache.get(c.ID)
            if(!cc){
data.Channels.splice(i, 1)
        data.save()
            }

          })
          
          data.Channels.forEach((chan, i) => {
            let chon = message.guild.channels.cache.get(chan.ID)
            if(chon){
            chon.updateOverwrite(message.guild.roles.cache.get(chan.Role), {
            SEND_MESSAGES: false
            });
            chon.send(
              new MessageEmbed()
              .setTitle('Server Lockdown :lock:')
              .setDescription(data.Msg)
              .setColor("RED")
              .setFooter(message.guild.name)
              .setTimestamp()
            )
            }
          })
          await Lockdown.findOneAndUpdate({ Guild: message.guild.id }, { $set: {Locked: true} })
          message.channel.send(`:white_check_mark: | Locked down **${data.Channels.length}** channel(s).`)
        }if(!data){
          message.channel.send(`There are no channels added! Use \`${prefixx}lockdown add <channel>\`.`)
        }
      })
    }
if(arguments[0]){
    if(arguments[0].toLowerCase() === 'add'){
      if(!arguments[1]) return message.channel.send("Please specify a channel.")
      let chan = message.guild.channels.cache.get(arguments[1])
      if(arguments[1].startsWith('<#') && arguments[1].endsWith('>')){
        let num = arguments[1].replace('<#', '').replace('>', '')
        chan = message.guild.channels.cache.get(num)
      }
      if(!chan) return message.channel.send("Please specify a valid channel.")
      let roleo = message.guild.roles.everyone.id
      if(arguments[2]){
        if(Number(arguments[2])){
          roleo = message.guild.roles.cache.get(arguments[2]).id
        }if(arguments[2].startsWith('<@&') && arguments[2].endsWith('>')){
          let numol = arguments[2].replace('<@&','').replace('>','')
          roleo = message.guild.roles.cache.get(numol).id
        }
      }
      await Lockdown.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          let yos = false
          data.Channels.map(async (c, i) => {
            if(c.ID === chan.id) yos = true
            

          })
          if(yos) return message.channel.send("This channel is already added.")
          
          let obj = {
            ID: chan.id,
            Role: roleo
          }
          data.Channels.push(obj)
          data.save()
          message.channel.send(`:white_check_mark: | Added <#${chan.id}> to lockdown list.`)
          
        }if(!data){
          await new Lockdown({
            Guild: message.guild.id,
            Locked: false,
            Channels: [
              {
                ID: chan.id,
                Role: roleo
              }
            ],
            Msg: 'This server is locked down.',
            UnMsg: 'Unlocked server.'
          }).save()
          message.channel.send(`:white_check_mark: | Added <#${chan.id}> to lockdown list.`)
        }
      })
    } else if(arguments[0].toLowerCase() === 'list'){
      await Lockdown.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          const mop = data.Channels.map((a, i) => `<#${a.ID}> (${a.ID}) [${message.guild.roles.cache.get(a.Role)}]`)
          if(!mop.length) return message.channel.send("There isn't any channel added.")
          const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(mop)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(8)
    .setPageIndicator(true)
    .formatField(`${data.Channels.length} channels.`, el => el);

FieldsEmbed.embed
  .setTitle(`Lockdown channels.`)
  .setColor(65535)
  .addField('Unlock message', data.UnMsg)
  .addField('Lock message', data.Msg)

FieldsEmbed.build();
        }if(!data){
          return message.channel.send('There are no channels added.')
        }
      })
    }else if(arguments[0].toLowerCase() === 'remove'){
      if(!arguments[1]) return message.channel.send("Please specify a channel.")
      let chan = message.guild.channels.cache.get(arguments[1])
      if(arguments[1].startsWith('<#') && arguments[1].endsWith('>')){
        let num = arguments[1].replace('<#', '').replace('>', '')
        chan = message.guild.channels.cache.get(num)
      }
      if(!chan) return message.channel.send("Please specify a valid channel.")
      await Lockdown.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          let dolt = false
          data.Channels.map((o, i) => {
            if(o.ID === chan.id) {
              dolt = true
              data.Channels.splice(i, 1)
              data.save()
            }
          })
          if(dolt){
            message.channel.send(`:white_check_mark: | Removed **#${chan.name}** from lockdown list.`)
          }if(!dolt)
          message.channel.send("This channel is not added.")
        }if(!data){
          message.channel.send(`There are no channels added.`)
        }
      })
    }else if(lockdownmsg.includes(arguments[0].toLowerCase())){
      const msg = arguments.slice(1).join(' ')
      
      await Lockdown.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          if(!msg) return message.channel.send(`The current lock message is \`${data.Msg}\``)
          await Lockdown.findOneAndUpdate({ Guild: message.guild.id }, { $set: {Msg: msg} })
          message.channel.send(':white_check_mark: | Successfully changed the lock message.')
        }if(!data){
          message.channel.send("Add a channel to the lockdown list first")
        }
      })
      }else if(unlockdownmsg.includes(arguments[0].toLowerCase())){
      const msg = arguments.slice(1).join(' ')
      await Lockdown.findOne({ Guild: message.guild.id }, async (err, data) => {
        if(data){
          if(!msg) return message.channel.send(`The current lock message is \`${data.UnMsg}\``)
          await Lockdown.findOneAndUpdate({ Guild: message.guild.id }, { $set: {UnMsg: msg} })
          message.channel.send(':white_check_mark: | Successfully changed the unlock message.')
        }if(!data){
          message.channel.send("Add a channel to the lockdown list first")
        }
      })
      }else return message.channel.send("Invalid arguments.")
       
     
}
  }
}
