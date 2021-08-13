module.exports = {
  commands: 'fight',
  description: 'Fight someone.',
  type: 'guildonly',
  guildID: '655780171496030240',
  minArgs: 1,
  expectedArgs: '<user>',
  callback: async (message, arguments, text, client) => {
    const opponent = message.mentions.members.first() || message.guild.member(client.users.cache.get(arguments[0]))
if (!opponent) return message.channel.send(`Please mention who you want to fight`);
if(opponent.user.bot) return message.lineReplyNoMention("You can't fight bots.")
const { fight } = require('weky');
const battle = new fight({
    client: client,
    message: message,
    acceptMessage: 'Click to fight with <@' + message.author + '>',
    challenger: message.author,
    opponent: opponent.user, 
    hitButtonText: 'HIT',
    hitButtonColor: 'red',
    healButtonText: 'HEAL',
    healButtonColor:  'green',
    cancelButtonText: 'CANCEL',
    cancelButtonColor: 'blurple',
});
battle.start();
  }
}