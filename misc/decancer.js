const { weirdToNormalChars } = require('weird-to-normal-chars')

module.exports = {
    commands: ['decancer', 'dc'],
    description: "Removes special characters from the mentioned member's username",
    permissions: "MANAGE_NICKNAMES",
    minArgs: 1,
    expectedArgs: "<member>",
    permissionsbot: "MANAGE_NICKNAMES",
    callback: async (message, arguments, text, client) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]) || message.guild.members.cache.find(m => m.displayName.toLowerCase().includes(arguments.slice(0).join(' ')))
        if(!member) return message.channel.send(":x: I can't find this member")
        if(!member.displayName.match(/[^a-zA-Z0-9]/g)) return message.channel.send(":x: This user is already decancered")
        if(member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send(':x: This member is higher than me')
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(":x: This user is higher than you")
        let cleaned = weirdToNormalChars(member.displayName).replace(/[^a-zA-Z0-9]/g, '')
        if(!cleaned.length) cleaned = 'idk'
        member.setNickname(cleaned, 'Decancered')
        message.channel.send(":white_check_mark: | Decancered member")

    }
}