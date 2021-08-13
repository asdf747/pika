const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    commands: ['editsnipe', 'esnip', 'esnipe'],
    description: 'Shows the last edited message.',
    callback: async (message, arguments, text, client) => {
      let channel = message.channel
      let snipe = +arguments[0] - 1 || 0
      let e = 'a'
      if(arguments[0]){
        if(arguments[0].startsWith('<#')){
          if(arguments[0].endsWith('>')){
           e = arguments[0].replace('<#','').replace('>','')
           channel = message.guild.channels.cache.get(e)
           snipe = +arguments[1] - 1 || 0
          }
        }
      }
      if(message.author.id === "538352367654141952"){
        const chann = message.guild.channels.cache.get(channel.id)
      if(!chann) return message.channel.send("This channel doesn't exist.")
const esnipes = client.esnipes.get(channel.id);
      if(!esnipes) return message.channel.send("There's nothing to snipe!")

      const target = esnipes[snipe];
      if(!target) return message.lineReply(`There are only ${esnipes.length} messages!`);

      const { msg, time, image } = target;
      return message.channel.send(
        new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setImage(image)
        .setFooter(`${moment(time).fromNow()} | ${snipe + 1}/${esnipes.length}`)
      )
      }
      if(message.guild.id === "655780171496030240"){
        const role = message.guild.roles.cache.find(r => r.id == "798783951421964288")
        const role2 = message.guild.roles.cache.find(r => r.id == "784328545085554698")
        const role3 = message.guild.roles.cache.find(r => r.id == "784335970333622304")
        if(message.member.roles.cache.some(r => r.id == "798783951421964288")) {
          const chann = message.guild.channels.cache.get(channel.id)
      if(!chann) return message.channel.send("This channel doesn't exist.")
const esnipes = client.esnipes.get(channel.id);
      if(!esnipes) return message.channel.send("There's nothing to snipe!")

      const target = esnipes[snipe];
      if(!target) return message.lineReply(`There are only ${eesnipes.length} messages!`);

      const { msg, time, image } = target;
      return message.channel.send(
        new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setImage(image)
        .setFooter(`${moment(time).fromNow()} | ${snipe + 1}/${esnipes.length}`)
      )
        } else if(message.member.roles.cache.some(r => r.id == "784328545085554698")) {
          const chann = message.guild.channels.cache.get(channel.id)
      if(!chann) return message.channel.send("This channel doesn't exist.")
const esnipes = client.esnipes.get(channel.id);
      if(!esnipes) return message.channel.send("There's nothing to snipe!")

      const target = esnipes[snipe];
      if(!target) return message.lineReply(`There are only ${eesnipes.length} messages!`);

      const { msg, time, image } = target;
      return message.channel.send(
        new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setImage(image)
        .setFooter(`${moment(time).fromNow()} | ${snipe + 1}/${esnipes.length}`)
      )
        } else if(message.member.roles.cache.some(r => r.id == "784335970333622304")){
          const chann = message.guild.channels.cache.get(channel.id)
      if(!chann) return message.channel.send("This channel doesn't exist.")
const esnipes = client.esnipes.get(channel.id);
      if(!esnipes) return message.channel.send("There's nothing to snipe!")

      const target = eesnipes[snipe];
      if(!target) return message.lineReply(`There are only ${esnipes.length} messages!`);

      const { msg, time, image } = target;
      return message.channel.send(
        new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setImage(image)
        .setFooter(`${moment(time).fromNow()} | ${snipe + 1}/${esnipes.length}`)
      )
        } else return message.lineReply(`You need one of these roles to be able to run this command **${role.name}**, **${role2.name}**, **${role3.name}**`)
      }
      const chann = message.guild.channels.cache.get(channel.id)
      if(!chann) return message.channel.send("This channel doesn't exist.")
const esnipes = client.esnipes.get(channel.id);
      if(!esnipes) return message.channel.send("There's nothing to snipe!")

      const target = esnipes[snipe];
      if(!target) return message.lineReply(`There are only ${esnipes.length} messages!`);

      const { msg, time, image } = target;
      message.channel.send(
        new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setImage(image)
        .setFooter(`${moment(time).fromNow()} | ${snipe + 1}/${esnipes.length}`)
      )
      
      }
}