const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['channel'],
  expectedArgs: '<topic/name/position> <input>',
  minArgs: 2,
  permissions: "MANAGE_CHANNELS",
  permissionError: "You can't manage channels.",
  permissionsbot: "MANAGE_CHANNELS",
  description: 'Edits a channel.',
  callback: async (message, arguments, text, client) => {
    if(arguments[0].toLowerCase() === "topic"){
  const topic = arguments.slice(1).join(" ")
  message.channel.setTopic(topic, `Action done by ${message.author.tag}`)
  .then(channel => message.channel.send(
    new MessageEmbed()
    .setTitle("Updated channel!")
    .setDescription(`**Topic:** ${topic}`)
    .setFooter(`ID: ${channel.id}`)
  ))
  .catch(err => message.channel.send(err))
}
if(arguments[0].toLowerCase() === "name"){
  if(!arguments[1]) return message.channel.send("Incorrect syntax! Use `=channel name <new_name>`")
  const nam = arguments.slice(1).join(" ")
  message.channel.setName(nam, `Action done by ${message.author.tag}`)
  .then(channel => message.channel.send(
    new MessageEmbed()
    .setTitle("Updated channel!")
    .setDescription(`**Name:** #${channel.name}`)
    .setFooter(`ID: ${channel.id}`)
  ))
  .catch(err => message.channel.send(err))
}
if(arguments[0].toLowerCase() === "position"){
  if(!arguments[1]) return message.channel.send("Argument 2 missing")
  if(isNaN(arguments[1])) return message.channel.send("Please enter a valid position")
  message.channel.setPosition(arguments[1], `Action done by ${message.author.tag}`)
  .then(channel => message.channel.send(
    new MessageEmbed()
    .setTitle("Updated channel!")
    .setDescription(`**Position:** ${channel.position}`)
    .setFooter(`ID: ${channel.id}`)
  ))
  .catch(err => message.channel.send(err))
}
if(arguments[0].toLowerCase() === "info"){
  const cmds = new Discord.MessageEmbed()
  .setTitle("Channel options")
  .setDescription('**name**\n**topic**\n**position**')
  .setColor(message.author.displayHexColor)
  message.channel.send(cmds)
}



  }
}