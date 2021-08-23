const db = require('../funcs')
const config = require('../config.json')
const fs = require('fs')
const jsonfile = require('jsonfile')


module.exports = {
  commands: ['prefix', 'setprefix'],
  permissions: "ADMINISTRATOR",
  description: "Changes the prefix of the bot.",
  permissionError: "You can't admin to run this command.",
  callback: async (message, arguments, text, client) => {
    if(!arguments[0]){
      let pref = await db.fetch(`prefix_${message.guild.id}`)
      if(!pref){pref = config.prefix}
      message.lineReplyNoMention(`The current prefix is \`${pref}\`.`)
      }else{
        await db.set(`prefix_${message.guild.id}`, arguments[0])
      message.lineReplyNoMention(`Set prefix to \`${arguments[0]}\`.`)
      const obj = {
        Guild: message.guild.id,
        Prefix: arguments[0]
      }
      const data = loadJSON('../prefix.json')

      data.push(obj)

      saveJSON('../prefix.json', data)
      
      }
  }
}

async function loadJSON(filename){
  return JSON.parse(
    fs.existsSync(filename)
    ? fs.readFileSync(filename).toString()
    : '""'
  )
}

async function saveJSON(filename, json){
  return fs.writeFileSync(filename, JSON.stringify(json))
}