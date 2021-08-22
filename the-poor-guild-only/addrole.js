const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'addrole',
  minArgs: 1,
  expectedArgs: '<role> [channel]',
  description: 'Gives role view channels permissions in a channel.',
  permissions: "ADMINISTRATOR",
  callback: async (message, arguments, text, client) => {
    var matcho = /"(.*?)"/g
    const ass = arguments.slice(0).join(' ').toLowerCase().match(matcho)
    let leng = 1
    let role = message.guild.roles.cache.get(arguments[0])
    if(arguments[0].startsWith('<@&') && arguments[0].endsWith('>')){
      num = arguments[0].replace('<@&','').replace('>', '')
      role = message.guild.roles.cache.get(num)
    }
    if(!role) role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(arguments[0].toLowerCase()))

    if(arguments[0].includes('"')) ass.map(e => {
      leng = e.replace('"', '').replace('"', '').split(/[ ]+/).length
      role =  message.guild.roles.cache.find(r => r.name.toLowerCase().includes(e.replace('"', '').replace('"', '')))
    })
    let chan = arguments.slice(leng).join(' ').split(/[ ]+/)
    let channel = message.channel
    if(chan){
      if(Number(chan[0])) channel = message.guild.channels.cache.get(chan[0])
    if(chan[0].startsWith('<#') && chan[0].endsWith('>')){
      numo = chan[0].replace('<#','').replace('>','')
      channel = message.guild.channels.cache.get(numo)
    }
    }
    if(!role) return message.channel.send("Please specify a valid role.")
    if(!channel) return message.channel.send("Please specify a valid role.")

    channel.updateOverwrite(role, {
            VIEW_CHANNEL: true
            }).then(() => message.channel.send(
              new MessageEmbed()
              .setTitle('Added role')
              .setDescription(`**Name:** ${role.name}`)
              .setFooter(`ID: ${role.id}`)
              .setColor(role.hexColor)
            ))
            .catch((err) => message.channel.send(
              new MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setDescription(`:x: An error has occured\n\n\`${err}\``)
              .setColor(15158332)
            ))

  }
}