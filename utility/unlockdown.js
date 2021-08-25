const Lockdown = require('../models/lockdown')
const { MessageEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed')
const config = require('../config.json')
const db = require('quick.db')

module.exports = {
  commands: ['unlockdown', 'ud'],
  permissions: "MANAGE_CHANNELS",
  callback: async (message, arguments, text, client) => {
    if (arguments[0] && arguments[0].toLowerCase() === 'server') {
      if (!message.guild.id === '655780171496030240') return
      const folt = x => {
        return (x.author.id === message.author.id)
      }
      const ms = await message.channel.send("Are you sure you want to unlock the server?")
      const very = await message.channel.awaitMessages(folt, { max: 1, time: 10000 });

      if (!very.size) return message.channel.send("Timeout.")

      let choce = very.first().content.toLowerCase()
      if (choce === 'yes') console.log('ass')
      else if (choce === 'no') return message.channel.send("Cancelled action")
      else return message.channel.send('Invalid option')

      await message.guild.members.cache.forEach(memo => {
        const rol = message.guild.roles.cache.get('876124352796581918')
        if (rol) {
          if (memo.roles.cache.some(r => r.id === '876124352796581918')) {
            memo.roles.remove(rol)
          }
        }
      })
      await message.channel.send(":white_check_mark: | Task done!")
      return
    }
    let prefixx = await db.fetch(`prefix_${message.guild.id}`)
    if (prefixx === null) { prefixx = config.prefix }

    await Lockdown.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {

        if (!data.Channels.length) return message.channel.send(`There are no channels added! Use \`${prefixx}lockdown add <channel>\`.`)
        if (!data.Locked) return message.channel.send("The server is already unlocked.")

        const filter = x => {
          return (x.author.id === message.author.id)
        }
        const msg = await message.channel.send("Are you sure you want to unlock the server?")
        const verify = await message.channel.awaitMessages(filter, { max: 1, time: 10000 });

        if (!verify.size) return message.channel.send("Timeout.")

        let choice = verify.first().content.toLowerCase()
        if (choice === 'yes') console.log('ass')
        else if (choice === 'no') return message.channel.send("Cancelled action")
        else return message.channel.send('Invalid option')


        data.Channels.map(async (c, i) => {
          let cc = message.guild.channels.cache.get(c.ID)
          if (!cc) {
            data.Channels.splice(i, 1)
            data.save()
          }

        })

        data.Channels.forEach((chan, i) => {
          let chon = message.guild.channels.cache.get(chan.ID)
          if (chon) {
            chon.updateOverwrite(message.guild.roles.cache.get(chan.Role), {
              SEND_MESSAGES: null
            });
            chon.send(
              new MessageEmbed()
                .setTitle('Server Unlock :unlock:')
                .setDescription(data.UnMsg)
                .setColor("GREEN")
                .setFooter(message.guild.name)
                .setTimestamp()
            )
          }
        })
        await Lockdown.findOneAndUpdate({ Guild: message.guild.id }, { $set: { Locked: false } })
        message.channel.send(`:white_check_mark: | Unlocked **${data.Channels.length}** channel(s).`)
      } if (!data) {
        message.channel.send(`There are no channels added! Use \`${prefixx}lockdown add <channel>\`.`)
      }
    })
  }
}