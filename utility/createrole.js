const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['createrole', 'crrole'],
  permissions: "MANAGE_ROLES",
  permissionError: "You can't manage roles.",
  permissionsbot: "MANAGE_ROLES",
  description: 'Creates a role.',
  callback: async (message, arguments, text, client) => {
    await message.channel.send("Please enter a name for the role")
        const nom = await message.channel.awaitMessages(x => x.author.id === message.author.id, { time: 15000, max: 1 })
        if(!nom.size) return message.channel.send("Timeout")

        await message.channel.send("Now enter a hex code enter none if no hex code")
        const hex = await message.channel.awaitMessages(x => x.author.id === message.author.id, { time: 15000, max: 1 })
        if(!hex.size) return message.channel.send("Timeout")
        if(!hex.first().content.toLowerCase() === 'none'){
          const matcho = /^#[0-9A-F]{6}$/i
          if(!hex.first().content.startsWith('#')) matcho = /^[0-9A-F]{6}$/i
          const e = matcho.test(hex.first().content)
          if(!e) return message.channel.send("Invalid hex code")
        }
        let hexcolor = hex.first().content.toLowerCase()
        if(hexcolor === 'none') hexcolor = "#000000"
        let name = nom.first().content

        message.guild.roles.create({
          data: {
            name,
            color: `#${hexcolor.replace('#','')}`
          },
          reason: `Created by ${message.author.tag}`
        }).then(role => {
          message.channel.send(
            new MessageEmbed()
            .setTitle("Created role")
            .setDescription(`**Name:** ${role.name}\n**Color:** ${role.hexColor}`)
            .setTimestamp()
            .setFooter(`ID: ${role.id}`)
            .setColor(role.hexColor)
          )
        })

  }
}