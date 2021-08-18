const path = require('path')
const fs = require('fs')

module.exports = (client) => {
  const baseFile3 = 'command-base.js'
  const commandBase3 = require(`./${baseFile3}`)

  const commands3 = []

  const readCommands3 = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands3(path.join(dir, file))
      } else if (file !== baseFile3 && file !== 'load-commands.js') {
        const option = require(path.join(__dirname, dir, file))
        commands3.push(option)
        if (client) {
          commandBase3(client, option)
        }
      }
    }
  }

  readCommands3('.')

  return commands3
}