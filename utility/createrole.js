const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['createrole', 'crrole'],
  expectedArgs: '<hex_code> <role_name>',
  minArgs: 2,
  permissions: "MANAGE_ROLES",
  permissionError: "You can't manage roles.",
  permissionsbot: "MANAGE_ROLES",
  description: 'Creates a role.',
  callback: async (message, arguments, text, client) => {
        const name = arguments.slice(1).join(" ");
        
        if(arguments[0].toLowerCase() === "none"){
        message.guild.roles.create({
            data: {
              name: name,
              color: "#000000",
            },
            reason: `Action done by ${message.author.id}`,
          })
            .then(role => message.lineReplyNoMention(
              new MessageEmbed()
              .setTitle("Role created!")
              .setDescription(`**Name:** ${role.name}\n**Color:** ${role.hexColor}`)
              .setColor(`${role.hexColor}`)
              .setFooter(`ID: ${role.id}`)
            ))
            .catch(err => message.lineReplyNoMention(
              new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(15158332)
            .setDescription(`:x: An error has occured!\n\n \`${err}\``)
            ));
        }else{ if(!arguments[0].startsWith('#')) return message.lineReplyNoMention("Invalid hex code.") 
        message.guild.roles.create({
          data: {
            name: name,
            color: arguments[0],
          },
          reason: `Action done by ${message.author.id}`,
        })
          .then(role => message.lineReplyNoMention(
            new MessageEmbed()
              .setTitle("Role created!")
              .setDescription(`**Name:** ${role.name}\n**Color:** ${role.hexColor}`)
              .setColor(`${role.hexColor}`)
              .setFooter(`ID: ${role.id}`)
          ))
          .catch(err => message.lineReplyNoMention(
            new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(15158332)
            .setDescription(`:x: An error has occured!\n\n \`${err}\``)
          ));}

  }
}