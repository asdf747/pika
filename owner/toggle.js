const disbut = require("discord-buttons");
const disbutpages = require("discord-embeds-pages-buttons")
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'toggle',
  callback: async (message, arguments, text, client) => {
    if(!arguments[0]){
    const nothing = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle("Toggles.")
    .addFields(
      { name: 'hi', value: 'bye', inline: true }
    )
    .setColor("GREY")

    const nothing2 = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle("Toggles.")
    .setDescription('hi2')
    .setColor("GREY")

    const nothing3 = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle("Toggles.")
    .setDescription('hi3')
    .setColor("GREY")

    const pages = [
      nothing,
      nothing2,
      nothing3,
    ];

    disbutpages.pages(client, message, pages, 100000, disbut, "grey", "⏩", "⏪", "❌")

    }
  }
}