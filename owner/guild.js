const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: 'guild',
  description: 'Leaves or check if the bot is in a guild.',
  minArgs: 2,
  expectedArgs: 'leave/check <guild_ID>',
  callback: async (message, arguments, text, client) => {
    if(arguments[0].toLowerCase() === "leave"){
    if(!arguments[1]) return message.channel.send(`Incorrect syntax! Use \`=guild leave <guild_ID>\``)
if(isNaN(arguments[1])) return message.channel.send("Please enter a valid guild ID")
let gasoline = client.guilds.cache.get(arguments[1])
if(!gasoline) return message.channel.send("This guild doesn't exist or I am not in it")
client.guilds.cache.get(arguments[1]).leave()
.then(guild => messge.channel.send(`Left guild ${guild}.`))
.catch(err => message.channel.send("There was an error while leaving guild"));
  } else if(arguments[0].toLowerCase() === "check"){
    if(!arguments[1]) return message.channel.send(`Incorrect syntax! Use \`=guild check <guild_ID>\``)
    if(isNaN(arguments[1])) return message.channel.send("Please enter a valid guild ID")
    const check = client.guilds.cache.get(arguments[1])
    if(check){
      message.channel.send("I am in that guild.")
    }else{message.channel.send("I am not in that guild.")}
  } else return message.lineReplyNoMention("Invalid arguments.")
  }
}