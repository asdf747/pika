require('discord-buttons')
const { Snake }  = require("discord-gamecord")

module.exports = {
  commands: ['snake', 'snek'],
  description: "Play a snake game",
  callback: async (message, arguments, text, client) => {
    new Snake({
      message: message,
      embed: {
        title: 'Snake Game',
	color: '#7289da',
	OverTitle: "Game Over",
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢' },
      emojis: {
        board: '⬛', 
        food: '🍎',
        up: '⬆️', 
        down: '⬇️',
	right: '➡️',
	left: '⬅️',
      }
    }).startGame();
    }



  }
