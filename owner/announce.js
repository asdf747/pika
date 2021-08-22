const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'announce',
  minArgs: 2,
  expectedArgs: '<#channel> <message> <-ping ?>',
  callback: async (message, arguments, text, client) => {
    let mention;

    let clean = arguments.slice(1).join(" ")

    const lok = message

    const channel = message.mentions.channels.first();
    if(!channel) return message.lineReply("Please specify a channel");

    if(!arguments[1]) return message.lineReply("Please specify a message to announce")

    if(arguments.slice(1).join(" ").toLowerCase().endsWith('-ping')){
      clean = arguments.slice(1).join(" ").replace('-ping', '')


      mention = true;
    } else mention = false;

    if(!clean) return message.lineReply("Please specify a message to announce")

    if(mention === true) channel.send('@everyone');

    channel.send(
      new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(clean)
      .setTimestamp()
      .setColor("RANDOM")
    ).then(() => lok.react('👍'))
    .catch(() => lok.react('👎'))



  }
}