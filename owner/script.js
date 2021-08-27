const tranascript = require('discord-transcript');

module.exports = {
    commands: 'script',
    callback: async (message, arguments, text, client) => {

        let messagecollection = message.channel.messages.fetch({
            limit: 25

        })

        let link = await transcript.generate(message, messagecollection, message.channel);

        return message.channel.send(link);
    }
}
