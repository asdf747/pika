const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['randomcolor', 'rc'],
    description: 'Changes the role color randomly.',
    permission: "MANAGE_ROLES",
    permissionError: "You can't manage roles.",
    minArgs: 1,
    expectedArgs: '<role>',
    callback: async (message, arguments, text, client) => {
            if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.lineReplyNoMention("I don't have permissions to manage channels.")
      let random = Math.floor(Math.random()*16777215).toString(16);
      const name = arguments.slice(0).join(" ")
      let num = 'ass'
      let role = message.guild.roles.cache.find(r => r.id === arguments[0])
      if(isNaN(arguments[0])){role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(name.toLowerCase()))}
            if(arguments[0].startsWith('<@&')){
        if(arguments[0].endsWith('>')){
          num = arguments[0].replace('<@&', '').replace('>', '')
          role = message.guild.roles.cache.find(r => r.id === num)
        }
        }

       
      if(!role) return message.lineReplyNoMention(
        new MessageEmbed()
       .setAuthor(message.author.username, message.author.displayAvatarURL())
       .setColor(15158332)
       .setDescription(`:x: This role doesn't exist.`)
      )
      if(role.position >= message.member.roles.highest.position) return message.lineReplyNoMention(
        new MessageEmbed()
       .setAuthor(message.author.username, message.author.displayAvatarURL())
       .setColor(15158332)
       .setDescription(`:x: You can't manage this role.`))
      if(role.position >= message.guild.me.roles.highest.position) return message.lineReplyNoMention(
        new MessageEmbed()
       .setAuthor(message.author.username, message.author.displayAvatarURL())
       .setColor(15158332)
       .setDescription(`:x: I can't manage this role.`))
      role.edit({ color: random }, `Action done by ${message.author.tag}`)
     .then(updated => message.lineReplyNoMention(`Updated **${role.name}'s** color to **#${random}**.`))
     .catch(err => message.lineReplyNoMention(
       new MessageEmbed()
       .setAuthor(message.author.username, message.author.displayAvatarURL())
       .setColor(15158332)
       .setDescription(`:x: An error has occured!\n\n\`${err}\``)
     ));


      }
}