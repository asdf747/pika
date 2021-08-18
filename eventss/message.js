const Discord = require('discord.js')
require('discord-reply');
const config = require('../config.json')
const fs = require('fs')
const path = require('path')
const db = require('quick.db')
const bal = require('../models/economy')
const BL = require('../models/bl')
const ms = require('ms')
const HL = require('../models/highlight')
const moment = require('moment')
const AFK = require('../models/afks')
const BOMB = require('../models/bomb')


module.exports = async (client, message) => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return
  const dateo = new Date()

  
if(message.guild.id === '655780171496030240' && message.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION'){
  const golo = message.guild.roles.cache.get('789432483166945300')
  message.member.roles.add(golo, 'Boosted.')
}

    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix === null){prefix = config.prefix}
    if (message.content.includes("@here") || message.content.includes("@everyone")) return;
    if(message.content.includes(`<@${client.user.id}>`)){
      message.channel.send(`Hey, my prefix is \`${prefix}\``)
    }


  if(message.author.id != '538352367654141952'){
    if(message.content.toLowerCase().includes("confis")){
      client.channels.cache.get('842970314022584332').send(
        new Discord.MessageEmbed()
        .setTitle("Confis was mentioned.")
        .setDescription(`**User:** ${message.author.tag}\n**Channel:** #${message.channel.name}\n**Message:** ${message.content}\n**MessageURL:** [message](${message.url})`)
        .setTimestamp()
      )
    .catch(err => client.channels.cache.get('842970314022584332').send(`**${err}**`))
    }
  }

     // if(message.channel.id === "818842687460343848"){
        // client.channels.cache.get('860903231193743380').send(`**${message.author.tag}:** ${message.content}`)
      // }

       
let doc = await BL.findOne({ Guild: message.guild.id })
      if(doc){
      if(message.guild.id === "655780171496030240"){
        if(!doc.IgnoredChannels.includes(`<#${message.channel.id}>`)){
if(!message.member.roles.cache.some(r => r.id === "792793362989187132")) {
  if(!message.member.roles.cache.some(r => r.id === '783745292590645269')){
  
      if(doc.Words.length){
      
      let splittedMsgs = message.content.toLowerCase().replace(/\s/g, '')

      let sending = false;


        doc.Words.map((cont) => {
          if(splittedMsgs.includes(cont.toLowerCase().replace(/\s/g, ''))) sending = true
        })
      const channel = message.guild.channels.cache.get("865118526972100609")
      if(channel){
      const ass = new Date()
      const tom = ass - dateo
      const timeo = ms(tom, { long: true })
      let tam = '0.0'
      if(timeo.length === 6) tam = '0.'
      const wc = new Discord.WebhookClient('877468562606948362', 'dvYqfiSUnJelPZvMAefqlXGjJlKL25doYuwZRDw46p71KYEHubbZ3D4VT6H2aVA9f3XM')
      const asss = timeo.replace('ms', 'seconds')
      const ecoemb = new Discord.MessageEmbed()
      .setTitle("Situational report")
      .setDescription(`${message.author.tag} said a blacklisted word.\nUID: ${message.author.id}\nUser said it on <#${message.channel.id}>\nReported to fixed channel after ${tam}${asss}`)
      .setColor(3240149)
      .setTimestamp()
      if(sending) return wc.send(`The user <@${message.author.id}> said:\n${message.content}\nCheck <#783648953614598154> to see the message.`, ecoemb)

}
      }
      }
      }
      }
        
      }
       
      
      }


      
  await AFK.findOne({ Guild: message.guild.id }, async (err, data) => {
    if(data){
message.mentions.members.forEach(async mem => {
data.Afks.forEach(m => {
let chocker = message.guild.members.cache.get(m.User)
if(chocker){
  if(mem.id === m.User){
    if(message.author.id !== mem.id){
    message.channel.send(`${chocker.displayName} is AFK: ${m.Msg} - ${moment(m.Date).fromNow()}`)
    }
  }
}
})
})
    }
  })


await AFK.findOne({ Guild: message.guild.id }, async (err, data) => {
  if(data){
    data.Afks.forEach((a, i) => {
      if(a.User === message.author.id) {
        const dura = moment.duration(new Date() - a.Date)
        if(dura.as('seconds') > 30) {
          data.Afks.splice(i, 1)
          data.save()
          let nick = message.member.displayName.replace('[AFK]','')
          if(message.member.roles.highest.position < message.guild.me.roles.highest.position) message.member.setNickname(nick)
          message.channel.send(`${message.author} I removed your afk!`).then(msg => msg.delete({ timeout: 2000 }))
        }
      }
    })
  }
})


await BOMB.findOne({ Guild: message.guild.id }, async (err, data) => {
  if(data){
    data.Bombs.map((m, i) => {
      if(m.User === message.author.id && moment.duration(new Date() - m.Date).as('seconds') < 20) {message.delete()}
      if(m.User === message.author.id && moment.duration(new Date() - m.Date).as('seconds') >= 20) {
        data.Bombs.splice(i, 1)
        data.save()
        }
    })
  }
})



      await HL.findOne({ Guild: message.guild.id }, async (err, data) => {
  if(data){
    let word = 'theword'
    let sen = false
    let senduser = 'user'
    await Promise.all(
      data.Hls.map((v, i) => {
        if(message.content.toLowerCase().includes(v.Word.toLowerCase())) {
          word = v.Word
          sen = true
          senduser = v.Owner
        }
      })
    )
    if(sen) {
      let ther = false
      let sendo = true
      message.channel.messages.fetch({ limit: 10 }).then(msgs => {
        msgs.forEach(msg => {
          if(ther) return
          if(msg.author.id === senduser) {
            ther = true
            if(moment.duration(new Date() - msg.createdAt).as('minutes') < 2) sendo = false
          }
        })
      })
      const msgs = message.channel.messages.fetch({ limit: 5 }).then(messages => {
      const usersendto = message.guild.members.cache.get(senduser)
      if(!usersendto) return
      let channelignore = false
      let authorignore = false
      data.IgnoredChannels.map((a, i) =>{
        if(a.Owner === usersendto.id && a.ID === message.channel.id) channelignore = true
      })
      if(channelignore) return
      data.IgnoredUsers.map((a, i) =>{
        if(a.Owner === usersendto.id && a.ID === message.author.id) authorignore = true
      })
      if(usersendto.id === message.author.id) return
      if(authorignore) return
      if(!sendo) return
      if(!message.channel.permissionsFor(usersendto).has("VIEW_CHANNEL")) return
      usersendto.send(`Your highlight "${word}" was triggered in **${message.guild.name}** <#${message.channel.id}>`,
        new Discord.MessageEmbed()
        .setTitle(`${word}`)
        .setDescription(messages.map(msg => `**[${moment(msg.createdAt).format('LTS')}] ${msg.author.username}:** ${msg.content}`).reverse())
        .setFooter('Triggered')
        .setTimestamp()
        .addField('Message', `[Click here](${message.url})`)
        .setColor(usersendto.displayColor)
      )
      })
    }
  }
})
}