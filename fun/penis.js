const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['pp', 'penis'],
  callback: async (message, arguments, text, client) => {
    const user = message.mentions.users.first() || message.author;
    const pps = ["=", "==", "===", "====", "=====", "======", "=======", "========"];
    const pp = pps[Math.floor(Math.random() * pps.length)];
    const ppsize = new MessageEmbed()
      .setTitle("PP size machine")
      .setDescription(`${user.tag}'s penis\n8${pp}D`)
      .setColor("RANDOM")
    message.channel.send(ppsize)

  }
}