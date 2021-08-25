const BL = require('../models/bl')
const { MessageEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed');
const { embedPages } = require('../funcs')

module.exports = {
  commands: 'censor',
  minArgs: 1,
  description: 'Blacklist words.',
  type: 'guildonly',
  guildID: '655780171496030240',
  permissions: "BAN_MEMBERS",
  expectedArgs: '<add/remove/list/ignore/unignore> [word/#channel]',
  callback: async (message, arguments, text, client) => {
    if ('add'.includes(arguments[0].toLowerCase())) {
      if (!arguments[1]) return message.lineReply("Please specify a word.")
      const wor = arguments.slice(1).join(" ")
      await BL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          if (data.Words.includes(wor.toLowerCase())) return message.lineReply("This word is already censored.")
          data.Words.push(wor.toLowerCase())
          data.save()
          message.channel.send(`Added **${wor.toLowerCase()}** to censored list.`)
        } else if (!data) {
          await new BL({
            Guild: message.guild.id,
            Words: wor.toLowerCase()
          }).save()
          message.channel.send(`Added **${wor.toLowerCase()}** to censored list.`)
        }
      })
    } else if ('remove'.includes(arguments[0].toLowerCase())) {
      if (!arguments[1]) return message.lineReply("Please specify a word.")
      const wor = arguments.slice(1).join(" ")
      await BL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          if (!data.Words.includes(wor.toLowerCase())) return message.lineReply("This word isn't censored.")
          const filtered = data.Words.filter((target) => target !== wor.toLowerCase())
          await BL.findOneAndUpdate({ Guild: message.guild.id }, { $set: { Words: filtered } })
          message.channel.send(`Removed **${wor.toLowerCase()}** from censored list.`)
        } else if (!data) {
          message.channel.send("There are no blacklisted words.")
        }
      })
    } else if ('list'.includes(arguments[0].toLowerCase())) {
      await BL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          if (data.Words.join('\n') === "") return message.lineReply("There are no blacklisted words.")
          let options = {
            color: "BLUE",
            title: "Censored words",
            perPage: 8,
            header: `**${data.Words.length} censored word${data.Words.length !== 1 ? 's' : ''}**`
          }

          embedPages(client, message, data.Words, options)
        } else if (!data) {
          message.lineReply("There are no blacklisted words.")
        }
      })
    } else if ('ignore'.includes(arguments[0].toLowerCase())) {
      if (arguments[1]) {
        let num = arguments[1].replace('<#', '').replace('>', '')
        const channel = message.guild.channels.cache.get(num)
        if (!channel) return message.lineReply("Please mention a valid channel.")
        await BL.findOne({ Guild: message.guild.id }, async (err, data) => {
          if (data) {
            if (data.IgnoredChannels.includes(`<#${channel.id}>`)) return message.lineReply("This channel is already ignored.")
            data.IgnoredChannels.push(`<#${channel.id}>`)
            data.save()
            message.channel.send(`Ignored **#${channel.name}**.`)
          } else if (!data) {
            return message.channel.send("Please add a censored word first.")
          }
        })
        return
      }
      let doc = await BL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          if (data.IgnoredChannels.join('\n') === "") return message.channel.send("There are no ignored channels.")
          const FieldsEmbed = new Pagination.FieldsEmbed()
            .setArray(data.IgnoredChannels)
            .setAuthorizedUsers([message.author.id])
            .setChannel(message.channel)
            .setElementsPerPage(8)
            .setPageIndicator(false)
            .formatField('List: ', el => el);

          FieldsEmbed.embed
            .setTitle("Ignored channels list")

          FieldsEmbed.build();
        } else if (!data) {
          return message.channel.send("There are no ignored channels.")
        }
      })

    } else if ('unignore'.includes(arguments[0].toLowerCase())) {
      if (!arguments[1]) return message.lineReply("Please specify a channel.")
      let num = arguments[1].replace('<#', '').replace('>', '')
      const channel = message.guild.channels.cache.get(num)
      if (!channel) return message.lineReply("Please mention a valid channel.")
      await BL.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          if (!data.IgnoredChannels.includes(`<#${channel.id}>`)) return message.lineReply("This channel is not ignored.")
          const filtered = data.IgnoredChannels.filter((target) => target !== `<#${channel.id}>`)
          await BL.findOneAndUpdate({ Guild: message.guild.id }, { $set: { IgnoredChannels: filtered } })
          message.channel.send(`Unignored **#${channel.name}**.`)
        } else if (!data) {
          return message.channel.send("Please add a censored word first.")
        }
      })
    } else return message.lineReply("Invalid arguments.")
  }
}