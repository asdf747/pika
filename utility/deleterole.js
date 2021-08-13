const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['deleterole', 'delrole'],
  expectedArgs: '<role>',
  minArgs: 1,
  permissions: "MANAGE_ROLES",
  permissionError: "You can't manage roles.",
  permissionsbot: "MANAGE_ROLES",
  description: 'Deletes role.',
  callback: async (message, arguments, text, client) => {
        const gibrole = arguments.slice(0).join(" ");
        let roleu = message.guild.roles.cache.find(r => r.id === arguments[0])
        if(isNaN(arguments[0])){roleu = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(gibrole.toLowerCase()))}
        if(arguments[0].startsWith('<@&')){
          if(arguments[0].endsWith('>')){
            let num = arguments[0].replace('<@&', '').replace('>', '')
            roleu = message.guild.roles.cache.find(r => r.id === num)
          }
        }
         if(!roleu) return message.lineReplyNoMention("This role doesn't exist.")
         if(roleu.position >= message.member.roles.highest.position) return message.lineReplyNoMention("You can't delete this role.")
         if(roleu.position >= message.guild.me.roles.highest.position) return message.lineReplyNoMention("I can't delete this role.")

roleu.delete().then(role => message.lineReplyNoMention(
  new MessageEmbed()
  .setTitle("Role deleted!")
  .setDescription(`**Name:** ${role.name}`)
  .setColor(`${role.hexColor}`)
  .setFooter(`ID: ${role.id}`)
)).catch(err => message.lineReplyNoMention("I can't delete this role."))

  }
}