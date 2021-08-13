const { TicTacToe } = require('discord-gamecord')

module.exports = {
  commands: ['tictactoe', 'ttt'],
  minArgs: 1,
  expectedArgs: '<user>',
  callback: async (message, arguments, text, client) => {
const opponent = message.mentions.members.first() || message.guild.member(client.users.cache.get(arguments))
if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);
if(opponent.user.bot) return message.lineReplyNoMention("You can't play with bots.")
new TicTacToe({
    message: message,
    opponent: opponent.user,
    oEmoji: '🔵', 
    xEmoji: '❌',
    oColor: 'blurple',
    xColor: 'red',
    color: '#7289da',
    askMessage: 'Hey {opponent}, {challenger} challenged you for a game of TicTacToe!',
}).startGame();
  }
}