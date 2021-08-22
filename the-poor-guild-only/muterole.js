module.exports = {
  commands: 'muterole',
  minArgs: 1,
  expectedArgs: '<role>',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text, client) => {
    let role = message.guild.roles.cache.get(arguments[0])
    if(arguments[0].startsWith('<@&') && arguments[0].endsWith('>')){
      num = arguments[0].replace('<@&','').replace('>','')
      role = message.guild.roles.cache.get(num)
    }
    if(!role) return message.channel.send("This role doesn't exist.")
    message.guild.channels.cache.forEach((channel) => {
      if(channel.type === 'text'){
      channel.updateOverwrite(role, {
            SEND_MESSAGES: false
            })
      }
    })
    await message.channel.send(":white_check_mark: | Progress done.")
  }
}