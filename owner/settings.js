module.exports = {
    commands: 'settings',
    callback: async (message, arguments, text, client) => {
        message.channel.send(client.settings.owner)
    }
}