const discordInv = require('discord-inv')
const { MessageEmbed } = require('discord.js')

module.exports = {
  commands: ['inviteinfo', 'invinfo', 'ii'],
  minArgs: 1,
  expectedArgs: '<invite_link>',
  callback: async (message, arguments, text, client) => {
    discordInv.getInv(discordInv.getCodeFromUrl(arguments[0])).then(invite => {
      const desc = invite.guild.description || "None"
      const vanity = invite.guild.vanity_url_code || "None"
      const emb = new MessageEmbed()
        .setTitle("Invite information.")
        .setAuthor(`${invite.inviter ? `${invite.inviter.tag}` : 'Unknown#0000'}`, `${invite.inviter ? `${invite.inviter.avatarURL}` : `${message.author.defaultAvatarURL}`}`)
        .setDescription(`**Guild name:** ${invite.guild.name}\n**Channel:** #${invite.channel.name}\n**Approximate member count:** ${invite.approximate_member_count}\n**Vanity:** ${vanity}\n**Description:** ${desc}`)
        .setThumbnail(invite.guild.iconURL)
        .setFooter(`ID: ${invite.guild.id}`)
      message.channel.send(emb)
    }).catch(() => message.channel.send(
      new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor(15158332)
        .setDescription(`:x: Invalid invite link.`)
    ))
  }
}