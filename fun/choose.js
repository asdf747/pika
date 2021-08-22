module.exports = {
  commands: 'choose',
  minArgs: 2,
  expectedArgs: '<choices>',
  description: 'Chooses a random choice from arguments.',
  callback: async (message, arguments, text, client) => {
    let choices = arguments.slice(0).join(" ").split(',')
    if(!arguments.slice(0).join(' ').includes(',')) choices = arguments
    let randomchoice = Math.floor(Math.random() * Math.floor(choices.length)) 
    let final = choices[randomchoice]
    
    message.channel.send(final)
    .catch(() => message.channel.send("Failed to choose."))
  }
}