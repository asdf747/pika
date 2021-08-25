const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'embed',
  description: 'Sends an embed in a channel.',
  permissions: 'BAN_MEMBERS',
  permissionError: "You can't use this command.",
  minArgs: 3,
  expectedArgs: '<channel> <hex_code/random> <title>',
  callback: async (message, arguments, text, client) => {
    const chan = arguments[0].replace('<#', '').replace('>', '')
    const chck = message.guild.channels.cache.get(chan)
    if (!chck) return message.lineReplyNoMention("Invalid channel.")
    const me = message

    if (arguments[1].startsWith('#')) {
      if (arguments[1].length > 7) return message.lineReplyNoMention("Invalid hex code.")
      if (arguments[1].length < 7) return message.lineReplyNoMention("Invalid hex code.")
      const emb = new MessageEmbed()
        .setTitle(`${arguments.slice(2).join(" ")}`)
        .setColor(`${arguments[1]}`)

      chck.send(emb)
        .then(me.react("👍"))
    }
    else if (arguments[1].toLowerCase() === "random") {
      const emb = new MessageEmbed()
        .setTitle(`${arguments.slice(2).join(" ")}`)
        .setColor(`${arguments[1].toUpperCase()}`)

      chck.send(emb)
        .then(me.react("👍"))
    }
    else return message.lineReplyNoMention("Invalid hex code.")
  }
}