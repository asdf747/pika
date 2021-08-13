module.exports = {
  commands: 'getid',
  minArgs: 1,
  description: 'get an id of something',
  type: 'guildonly',
  guildID: '655780171496030240',
  expectedArgs: 'text',
  callback: async (message, arguments, text, client) => {
    message.channel.send(`\`${arguments.slice(0).join(' ')}\``)
  }
}