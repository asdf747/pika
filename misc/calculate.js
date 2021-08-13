const disbut = require('discord-buttons');
 const { Calculator } = require('weky')
const { MessageButton } = require('discord-buttons');

module.exports = {
  commands: ['calculate', 'calc', 'cal'],
  description: 'Solves a math equation.',
  disabled: true,
  callback: async (message, arguments, text, client) => {
    if(message.channel.id === "818842687460343848") return;
    await Calculator(message);
  }
}