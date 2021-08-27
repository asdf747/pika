const db = require('../funcs')

module.exports = {
    commands: 'script',
    callback: async (message, arguments, text, client) => {
        let func = function gg(){
            return message.channel.send('no')
        }
        let ass = func.toString()
        let non = new Function(ass)
        non()
}
}