const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  commands: ['givelevel', 'gl', 'lvl', 'level'],
  description: "A fake amaribot givelevel command.",
  minArgs: 1,
  expectedArgs: '<user> <level>',
  callback: async (message, arguments, text, client) => {
    let config = require('../config.json')
    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix === null){prefix = config.prefix}
    const user = message.mentions.users.first() || client.users.cache.get(arguments[0])
        if(!user) return message.channel.send("Invalid user")
        if(isNaN(arguments[1])) return message.channel.send("Invalid number")
        const max = new MessageEmbed()
        .setThumbnail("https:\/\/cdn.discordapp.com\/attachments\/656173754765934612\/671895577986072576\/Status.png")
        .setFooter("Type \">help givelevel\" for more information.")
        .setAuthor("Error", "https:\/\/cdn.discordapp.com\/emojis\/669388126413783053.png?v=1")
        .setColor(15551282)
        .setDescription(`The command you input is incomplete, please provide a valid argument. Thank you!\n\`\`\`${prefix}givelevel <@user> <level>\`\`\``)
        if(arguments[1] > 200) return message.channel.send(max)
        if(arguments[1] < 0) return message.channel.send(max)
        const give = new MessageEmbed()
        .setFooter("Type \">help givelevel\" for more information.")
        .setAuthor("Success", "https:\/\/cdn.discordapp.com\/emojis\/669388126309056513.png?v=1")
        .setColor(8899871)
        .setDescription(`The user <@${user.id}> is now level \`${arguments[1]}\`.`)
        message.channel.send(give)
        const gave = new MessageEmbed()
        .setFooter("THE POOR")
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 128 }))
        .setColor(44678)
        .setTitle(`${user.username}`)
        .setDescription(`**CONGRATS**\nYou are now level **${arguments[1]}**!!!`)

        message.channel.send(`<@${user.id}>`, gave)
  }
}