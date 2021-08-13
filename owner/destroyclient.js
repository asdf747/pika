module.exports = {
  commands: 'destroyclient',
  description: 'Turns off the bot.',
  callback: async (message, arguments, text, client) => {
    message.channel.send("Destroyed client")
    .then(client.destroy())
  }
}