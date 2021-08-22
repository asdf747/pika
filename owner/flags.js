const { MessageEmbed } = require('discord.js')


module.exports = {
  commands: ['flags', 'badges'],
  description: 'Displays the user\'s badges',
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.users.first() || client.users.cache.get(arguments[0]) || message.author;

    const flags = user.flags.toArray();

    if(flags.join("\n") === '') return message.lineReplyNoMention("This user has no badges.")

    message.channel.send(
      new MessageEmbed()
      .setTitle(`${user.username}'s badges.`)
      .setDescription(`\`${flags.join("\n")}\``)
    )
  }
}