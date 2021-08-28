const suggest = require('../models/suggestions')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'suggest',
    minArgs: 1,
    expectedArgs: "<suggestion>",
    descripton: "Suggests something",
    callback: async (message, arguments, text, client) => {
        let suggestion = arguments.slice(0).join(' ')
        await suggest.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                if(data.Channel === 'null') return message.channel.send("The suggestion channel isn't set yet")
                let ID = data.Suggestions.length + 1
                let obj = {
                    ID,
                    Suggestion: suggestion,
                    User: message.author.id,
                    Date: Date.now()
                }
                data.Suggestions.push(obj)
                data.save()
                message.channel.send(
                    new MessageEmbed()
                        .setTitle(`New suggestion | Suggestion #${ID}`)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setFooter(`ID: ${message.author.id}`)
                        .setDescription(`${suggestion}`)
                        .setColor("GREEN")
                ).then(msg => {
                    msg.react('<a:TICK:881188150263816204>')
                    msg.react('<a:CROSS:881188274520072254>')
                })
            } if (!data) {
                return message.channel.send("The suggestion channel isn't set yet")
            }
        })
    }
}