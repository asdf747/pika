const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['editrole'],
  expectedArgs: '<name/color/pos/mentionable/hoisted> <role> <input>',
  minArgs: 3,
  permissions: "MANAGE_ROLES",
  permissionError: "You can't manage roles.",
  permissionsbot: "MANAGE_ROLES",
  description: 'Edits a role.',
  callback: async (message, arguments, text, client) => {
    const content = arguments.slice(2).join(" ");
    var matcho = /"(.*?)"/g
    const ass = arguments.slice(0).join(' ').match(matcho)
    let name = arguments[1]
    let leng = 1
    if (arguments[1].includes('"')) ass.map(e => {
      leng = e.replace('"', '').replace('"', '').split(/[ ]+/).length
      name = `${e.replace('"', '').replace('"', '')}`
    })
    let input = arguments.slice(leng + 1).join(' ').split(/[ ]+/)
    if (arguments[1].includes('"')) input = arguments.slice(leng + 1).join(' ').split(/[ ]+/)
    if (!name) return message.channel.send("Please specify a role.")
    let role = message.guild.roles.cache.get(arguments[1])
    if (isNaN(arguments[1])) role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(name.toLowerCase()))
    if (arguments[1].startsWith('<@&')) {
      if (arguments[1].endsWith('>')) {
        let num = arguments[1].replace('<@&', '').replace('>', '')
        role = message.guild.roles.cache.find(r => r.id === num)
      }
    }
    if (!role) return message.lineReply(`This role doesn\'t exist`)
    if (role.position >= message.guild.me.roles.highest.position) return message.lineReplyNoMention("I can't manage this role")
    if (role.position >= message.member.roles.highest.position) return message.lineReplyNoMention("You can't manage this role")
    if ('name'.includes(arguments[0].toLowerCase())) {
      if (!input.slice(0).join(' ')) return message.channel.send("Please enter a name.")
      role.edit({ name: input.slice(0).join(' ') }, `Action done by ${message.author.tag}`)
        .then(roleuu => message.channel.send(
          new MessageEmbed()
            .setTitle("Updated role!")
            .setDescription(`**Name:** ${roleuu.name}`)
            .setColor(`${roleuu.hexColor}`)
            .setFooter(`ID: ${roleuu.id}`)
        ))
        .catch((err) => message.channel.send(`An error has occured! \`${err}\``));
    }
    if ('color'.includes(arguments[0].toLowerCase())) {
      if (!input) return message.channel.send('Please enter a hex code.')
      if (!arguments[2].startsWith('#')) return message.channel.send("Invalid hex code.")

      if (!role) return message.channel.send("Couldn't find that role.")
      if (role.position >= message.member.roles.highest.position) return message.lineReply("You can't manage this role.")

      role.edit({ color: input[0] }, `Action done by ${message.author.tag}`)
        .then(roleuu => message.channel.send(
          new MessageEmbed()
            .setTitle("Updated role!")
            .setDescription(`**Color:** ${roleuu.hexColor}`)
            .setColor(`${roleuu.hexColor}`)
            .setFooter(`ID: ${roleuu.id}`)
        ))
        .catch((err) => message.channel.send(`An error has occured! \`${err}\``));
    } if ('pos'.includes(arguments[0].toLowerCase())) {
      if (!input) return message.channel.send("Please enter a position")
      if (isNaN(input[0])) return message.channel.send("Please enter a valid position.")
      if (input[0] >= message.member.roles.highest.position) return message.lineReplyNoMention("This position is higher than your highest role position.")
      if (input[0] >= message.guild.me.roles.highest.position) return message.lineReplyNoMention("This position is higher than my highest role position.")
      role.setPosition(input[0], `Action done by ${message.author.tag}`)
        .then(roleuu => message.channel.send(
          new MessageEmbed()
            .setTitle("Updated role!")
            .setDescription(`**Position:** ${roleuu.position}`)
            .setColor(`${roleuu.hexColor}`)
            .setFooter(`ID: ${roleuu.id}`)
        ))
        .catch((err) => message.channel.send(`An error has occured! \`${err}\``));
    }
    if (arguments[0].toLowerCase() === "mentionable") {
      if (!input) return message.channel.send('Please enter a valid option')
      if ('yes'.includes(input[0].toLowerCase())) {
        role.setMentionable(true, `Action done by ${message.author.tag}`)
        .then(roleuu => message.channel.send(
          new MessageEmbed()
            .setTitle("Updated role!")
            .setDescription(`**Mentionable:** true`)
            .setColor(`${roleuu.hexColor}`)
            .setFooter(`ID: ${roleuu.id}`)
        ))
        .catch((err) => message.channel.send(`An error has occured! \`${err}\``));
      }
      if ('no'.includes(input[0].toLowerCase())) {
        role.setMentionable(false, `Action done by ${message.author.tag}`)
        .then(roleuu => message.channel.send(
          new MessageEmbed()
            .setTitle("Updated role!")
            .setDescription(`**Mentionable:** true`)
            .setColor(`${roleuu.hexColor}`)
            .setFooter(`ID: ${roleuu.id}`)
        ))
        .catch((err) => message.channel.send(`An error has occured! \`${err}\``));
      }
    }
    if ('hoisted'.includes(arguments[0].toLowerCase())) {
      if (!input) return message.channel.send("Please enter a valid option")
      if ('yes'.includes(input[0].toLowerCase())) {
        role.setHoist(true)
          .then(roleuu => message.channel.send(
            new MessageEmbed()
              .setTitle("Updated role!")
              .setDescription(`**Hoisted:** ${roleuu.hoist}`)
              .setColor(`${roleuu.hexColor}`)
              .setFooter(`ID: ${roleuu.id}`)
          ))
          .catch((err) => message.channel.send(`An error has occured! \`${err}\``));
      }
      if ('no'.includes(input[0].toLowerCase())) {
        role.setHoist(false)
          .then(roleuu => message.channel.send(
            new MessageEmbed()
              .setTitle("Updated role!")
              .setDescription(`**Hoisted:** ${roleuu.hoist}`)
              .setColor(`${roleuu.hexColor}`)
              .setFooter(`ID: ${roleuu.id}`)
          ))
          .catch((err) => message.channel.send(`An error has occured! \`${err}\``));
      }
    }

  }
}