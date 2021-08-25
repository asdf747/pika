const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['createchannel', 'crchannel'],
  expectedArgs: '<voice/text> <category_ID/none> <channel\'s name>',
  minArgs: 3,
  permissions: "MANAGE_CHANNELS",
  permissionError: "You can't create a channel.",
  permissionsbot: "MANAGE_CHANNELS",
  description: 'Creates a channel.',
  callback: async (message, arguments, text, client) => {
    const content = arguments.slice(2).join(" ");

    if (arguments[0].toLowerCase() === "text") {

      if (arguments[1].toLowerCase() === "none") return message.guild.channels
        .create(content, {
          type: 'text',
        })
        .then(
          channel => message.lineReplyNoMention(
            new MessageEmbed()
              .setTitle("Created text channel!")
              .setDescription(`**Name:** ${channel.name}\n**Parent:** None\n**Position**: ${channel.position}`)
              .setFooter(`ID: ${channel.id}`)
          )
        ).catch(err => message.lineReplyNoMention("Failed to create channel."))
      else {
        if (isNaN(arguments[1])) return message.lineReplyNoMention("Please enter a valid category ID")
        message.guild.channels
          .create(content, {
            type: 'text',
            parent: arguments[1],
          })
          .then((channel) => {
            message.lineReplyNoMention(new MessageEmbed()
              .setTitle("Created text channel!")
              .setDescription(`**Name:** ${channel.name}\n**Parent:** ${channel.parent.name}\n**Position**: ${channel.position}`)
              .setFooter(`ID: ${channel.id}`))
          }).catch(err => message.lineReplyNoMention("Failed to create channel."))
      }


    }
    if (arguments[0].toLowerCase() === "voice") {

      if (arguments[1].toLowerCase() === "none") return message.guild.channels
        .create(content, {
          type: 'voice',
        })
        .then(
          channel => message.lineReplyNoMention(
            new MessageEmbed()
              .setTitle("Created voice channel!")
              .setDescription(`**Name:** ${channel.name}\n**Parent:** None\n**Position**: ${channel.position}`)
              .setFooter(`ID: ${channel.id}`)
          )
        ).catch(err => message.lineReplyNoMention("Failed to create channel."))
      else {
        if (isNaN(arguments[1])) return message.lineReplyNoMention("Please enter a valid category ID")
        message.guild.channels
          .create(content, {
            type: 'voice',
            parent: arguments[1],
          })
          .then((channel) => {
            message.lineReplyNoMention(
              new MessageEmbed()
                .setTitle("Created voice channel!")
                .setDescription(`**Name:** ${channel.name}\n**Parent:** ${channel.parent.name}\n**Position**: ${channel.position}`)
                .setFooter(`ID: ${channel.id}`)
            )
          }).catch(err => message.lineReplyNoMention("Failed to create channel."))
      }


    }

  }
}