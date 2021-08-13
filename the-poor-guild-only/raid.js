module.exports = {
  commands: 'raid',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text, client) => {
    if(arguments[0]){
    if(arguments[0].toLowerCase() === 'stop') return
    }
    const user = message.mentions.users.first() || message.author
for (let i = 0; i < 200; i++){
  if(!message.guild.me.hasPermission('SEND_MESSAGES')) return i = 201
message.channel.send(`<@${user.id}>`)
}
  }
}