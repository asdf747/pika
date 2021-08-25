const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['serverinfo', 'si'],
    description: "Displays the server's information",
    callback: async (message, arguments, text, client) => {
        message.channel.send(
            new MessageEmbed()
                .setTitle(`Server information for ${message.guild.name}`)
                .setColor("BLUE")
                .addFields(
                    { name: "Members", value: `Total: ${message.guild.members.cache.size}\nHumans: ${message.guild.members.cache.filter(e => !e.user.bot).size}\nBots: ${message.guild.members.cache.filter(e => e.user.bot).size}` },
                    { name: "Server owner", value: `ID: ${message.guild.ownerID}\nTag: ${message.guild.members.cache.get(message.guild.ownerID).user.tag}\n<@${message.guild.ownerID}>` },
                    { name: "Channels", value: `Total: ${message.guild.channels.cache.filter(chan => chan.type !== 'category').size}\nText: ${message.guild.channels.cache.filter(chan => chan.type === 'text').size}\nVoice: ${message.guild.channels.cache.filter(chan => chan.type === 'voice').size}` },
                    { name: 'Boosts', value: `Total: ${message.guild.premiumSubscriptionCount}` },
                    { name: "Roles", value: `Total: ${message.guild.roles.cache.size}` }
                )
                .setFooter(`ID: ${message.guild.id}`)
                .setThumbnail(message.guild.iconURL())
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
        )
    }
}