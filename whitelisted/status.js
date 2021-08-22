const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'status',
  description: 'Changes the status of the bot.',
  minArgs: 2,
  expectedArgs: 'playing/streaming/watching <input>',
  callback: async (message, arguments, text, client) => {
    const content = arguments.slice(1).join(" ");

if(arguments[0].toLowerCase() === "playing"){
    client.user.setPresence({
    activity: {
      name: content,
      type: "PLAYING",
    },
})
.then(() => message.channel.send(new MessageEmbed()
  .setTitle(":white_check_mark: | Changed status!")
  .setDescription(`**Type:** Playing\n**Content:** ${content}`)
  .setColor("#2ecc71")))
.catch((err) => message.channel.send(
  new MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor(15158332)
  .setDescription(`:x: An error has occured!\n\n\`${err}\``)
))
} else if(arguments[0].toLowerCase() === "streaming"){
    client.user.setPresence({
  activity: {
    name: content,
    type: "STREAMING",
  },
})
.then(() => message.channel.send(new MessageEmbed()
  .setTitle(":white_check_mark: | Changed status!")
  .setDescription(`**Type:** Streaming\n**Content:** ${content}`)
  .setColor("#2ecc71")))
.catch((err) => message.channel.send(
  new MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor(15158332)
  .setDescription(`:x: An error has occured!\n\n\`${err}\``)
))
} else if(arguments[0].toLowerCase() === "watching"){
client.user.setPresence({
  activity: {
    name: content,
    type: "WATCHING",
  },
})
.then(() => message.channel.send(new MessageEmbed()
  .setTitle(":white_check_mark: | Changed status!")
  .setDescription(`**Type:** Watching\n**Content:** ${content}`)
  .setColor("#2ecc71")))
.catch((err) => message.channel.send(
  new MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor(15158332)
  .setDescription(`:x: An error has occured!\n\n\`${err}\``)
))

}
else return message.lineReplyNoMention(
  new MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor(15158332)
  .setDescription(":x: Invalid type.")
)
  }
}