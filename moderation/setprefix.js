const db = require('../funcs')
const config = require('../config.json')
const fs = require('fs')
const jsonfile = require('jsonfile')
const dob = require('quick.db')


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
      await dob.set(`prefix_${message.guild.id}`, arguments[0])
      
      }
  }
}
