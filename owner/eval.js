const { inspect } = require('util')
const Discord = require('discord.js')
const moment = require('moment')
const fs = require('fs')
const ms = require('ms')
const day = require('dayjs')

module.exports = {
  commands: 'eval',
  description: 'Executes a JavaScript code.',
  minArgs: 1,
  expectedArgs: '<script>',
  callback: async (message, arguments, text, client) => {
    const code = arguments.slice(0).join(" ")

    try {
      const result = await eval(code)
      let output = result
      if(typeof result !== 'string'){
        output = inspect(result)
      }

      message.channel.send(output, { code: 'js'})
    } catch (err) {
      console.log(err)
      message.channel.send(`An error has occured! \`${err}\`.`)
    }
  }
}