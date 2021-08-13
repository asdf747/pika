const { RockPaperScissors } = require('discord-gamecord')

module.exports = {
  commands: ['rockpaperscissors', 'rps'],
  description: 'Play a rock paper scissors game.',
  minArgs: 1,
  expectedArgs: '<user>',
  callback: async (message, arguments, text, client) => {
    const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === arguments[0])
    if(!member) return message.channel.send("I can't find this user..")
new RockPaperScissors({
    message: message,
    opponent: member.user,
    embed: {
      title: 'Rock paper scissors',
      description: 'Press a button below to make a choice!',
      color: '#7289da',
    },
    buttons: {
      rock: 'Rock',
  	  paper: 'Paper',
  	  scissors: 'Scissors',
    },
    askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Rock paper scissors!'
}).startGame();
  }
}