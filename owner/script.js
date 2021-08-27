const { set } = require('../funcs')

module.exports = {
    commands: 'script',
    callback: async (message, arguments, text, client) => {
        let action = async function(){
            message.channel.send('test')
        }
        await set(client, 'test', action)
    }
}