const settings = require('../models/settings')
const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const db = require('quick.db')

module.exports = {
    commands: 'settings',
    callback: async(message, arguments, text, client) => {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if(!prefix) prefix = config.prefix
        if(!arguments[0]){
            let doc = settings.findOne({ id: message.author.id })
            return message.channel.send(
                new MessageEmbed()
                .setTitle(`${message.author.username}${message.author.username.endsWith('s') ? '\'' : '\'s'} settings`)
                .setColor("BLUE")
                .setDescription(`U0se \`${prefix}settings [setting] [true/false]\` to change a value of a setting\n\n**Passive:** \`passive\` - ${doc && doc.Passive ? 'Enabled' : 'Disabled'}\n*Toggles whether or not passive mode will be on.*`)
            )
        }
        let settings = ['passive']
        if(!settings.includes(arguments[0].toLowerCase())) return message.channel.send("This setting doesn't even exist bruh.")
        switch(arguments[0].toLowerCase()){
            case 'passive':
                if(!arguments[1]) return message.channel.send("Please enter a valid value")
                if(!arguments[1].toLowerCase() === 'true' && !arguments[1].toLowerCase() === 'false') return message.channel.send("Please enter a valid value")
                let value = true
                if(arguments[1].toLowerCase() === 'false') value = false
                await settings.findOneAndUpdate({ id: message.author.id }, { Passive: value })
                message.channel.send(`Changed **Passive** setting to ${value}`)
        }
    }
}