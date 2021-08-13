module.exports = {
  commands: ['slowmode', 'sm'],
  description: 'Changes the channel slowmode',
  permissions: 'MANAGE_CHANNELS',
  permissionError: 'You don\'t have permissions to manage this channel.',
  permissionsbot: "MANAGE_CHANNELS",
  minArgs: 1,
  expectedArgs: '<interval>',
  callback: (message, arguments, text, client) => {
      let numo = arguments[0].match(/\d+/);
      if(isNaN(numo)) return message.lineReplyNoMention('Invalid arguments.')
      let num = Number(numo)
      let time = 'slowmodetime'
      let typ = 'type'
      if(arguments[0].toLowerCase().endsWith('s')){time = num
      typ = 'second(s)'} else if(arguments[0].toLowerCase().endsWith('m')){time = num * 60
      typ = 'minute(s)'} else if(arguments[0].toLowerCase().endsWith('h')){time = num * 3600
      typ = 'hour(s)'}
      else return message.lineReplyNoMention("Invalid arguments.")
      if(time > 21600) return message.lineReplyNoMention("Slowmode can't be more than 6 hours.")
      message.channel.setRateLimitPerUser(time, `Action done by ${message.author.tag}`)
      .then(message.lineReplyNoMention(`Slowmode is now ${numo} ${typ}.`))
      .catch(err => message.channel.send(`**${err}**`))
  }
}