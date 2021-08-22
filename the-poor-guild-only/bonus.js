const BONUS = require('../models/bonus')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'bonus',
  minArgs: 2,
  expectedArgs: 'add <role> <entry>',
  subCommands: 'remove',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text, client) => {
let role = message.guild.roles.cache.get(arguments[1])
if(arguments[1].startsWith('<@&') && arguments[1].endsWith('>')){
  nm = arguments[1].replace('<@&','').replace('>','')
  role = message.guild.roles.cache.get(nm)
}
if(!role) return message.channel.send("Please enter a valid role.")
if(arguments[0].toLowerCase() === 'add'){
let entry = parseInt(arguments[2])
if(!entry || entry <= 0) return message.channel.send("Please enter a valid entry.")
await BONUS.findOne({ Guild: message.guild.id }, async (err, data) => {
  if(data){
    let jas = false
    data.Roles.map(r => {
      if(r.ID === role.id) jas = true
    })
    if(jas) return message.channel.send("This role is already added.")
    let obj = {
      ID: role.id,
      Entry: entry
    }
    data.Roles.push(obj)
    data.save()
    message.channel.send(
      new MessageEmbed()
      .setTitle("Added role.")
      .setDescription(`**Role:** <@&${role.id}>\n**Multiplier:** ${entry}`)
      .setFooter(`ID: ${role.id}`)
    )
  }if(!data){
    await new BONUS({
      Guild: message.guild.id,
      Roles: [
        {
          ID: role.id,
          Entry: entry
        }
      ]
    }).save()
    message.channel.send(
      new MessageEmbed()
      .setTitle("Added role.")
      .setDescription(`**Role:** <@&${role.id}>\n**Multiplier:** ${entry}`)
      .setFooter(`ID: ${role.id}`)
    )
  }
})
}else if(arguments[0].toLowerCase() === 'remove'){
  await BONUS.findOne({ Guild: message.guild.id }, async (err, data) => {
    if(data){
      let kas = false
      data.Roles.map((r, i) => {
        if(r.ID === role.id) {
        kas = true
        data.Roles.splice(i, 1)
        data.save()
        }
      })
      if(!kas) return message.channel.send("This role isn't added.")
      message.channel.send(
        new MessageEmbed()
      .setTitle("Removed role.")
      .setDescription(`**Role:** <@&${role.id}>`)
      .setFooter(`ID: ${role.id}`)
      )
    }if(!data){
      message.channel.send("There aren't any roles added.")
    }
  })
}

  }
}