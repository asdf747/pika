const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'howgay',
  callback: async (message, arguments, text, client) => {
    let mention = message.mentions.users.first()
    let thingy = arguments.slice(0).join(" ")
    if(mention){thingy = mention.tag}
    const thing = thingy || message.author.tag
    let percent = Math.floor(Math.random() * 100)
    
    const embed = new MessageEmbed()
    .setTitle(`Gay Rate Machine`)
    .setDescription(`${thing} is **${percent}%** gay :rainbow_flag:`)
    .setColor("RANDOM")
    
    
    message.channel.send(embed)

  }
}