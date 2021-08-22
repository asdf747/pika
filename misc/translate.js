const { MessageEmbed } = require('discord.js')
const translate = require('@iamtraction/google-translate')

module.exports = {
  commands: 'translate',
  minArgs: 1,
  expectedArgs: '<text>',
  callback: async (message, arguments, text, client) => {
    translate(arguments.slice(0).join(" "), { to: 'en' }).then(res => {
      message.channel.send(
        new MessageEmbed()
        .setTitle("Translation")
        .setDescription(`${res.text}`)
        .setFooter(`Translated from ${res.from.language.iso}`)
      )
    }).catch(err => message.channel.send("An error has occured!"))
  }
}
