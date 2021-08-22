const path = require('path')
const fs = require('fs')

module.exports = (client) => {
  const baseFile2 = 'command-base.js'
  const commandBase2 = require(`./${baseFile2}`)

  const commands2 = []

  const readCommands2 = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands2(path.join(dir, file))
      } else if (file !== baseFile2 && file !== 'load-commands.js') {
        const option = require(path.join(__dirname, dir, file))
        commands2.push(option)
        if (client) {
          commandBase2(client, option)
        }
      }
    }
  }

  readCommands2('.')

  return commands2
}