module.exports = {
  commands: ['wouldyourather', 'wyr'],
  callback: async (message, arguments, text, client) => {
    const { WouldYouRather } = require('gamer-discord-utils')
	await WouldYouRather(message)
  }
}