const ms = require('ms')
const Pagination = require('discord-paginationembed')
const BONUS = require('../models/bonus')

module.exports = {
  commands: ['giveaway', 'gaw', 'g'],
  minArgs: 1,
  expectedArgs: 'start <timer> <winner> <requirement> <prize>',
  subCommands: 'timer reroll end list',
  callback: async (message, arguments, text, client) => {
    if (arguments[0].toLowerCase() === 'start') {
      let doc = await BONUS.findOne({ Guild: message.guild.id })
      let reqs = ''
      let bls = ''
      let bonusrole = ''
      let bonusentry = ''
      let bypass = ''
      if (doc && doc.Roles.length) {
        bonusrole = doc.Roles.map(r => `${r.ID}`).join(' ')
        bonusentry = doc.Roles.map(r => `${r.Entry}`).join(' ')
      }

      let giveawayDuration = arguments[1];
      if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
        return message.channel.send(':x: You have to specify a valid duration!');
      }


      let giveawayNumberWinners = arguments[2];
      var matches = giveawayNumberWinners.match(/(\d+)/)
      if (!matches || parseInt(matches[0]) <= 0 || !giveawayNumberWinners.toLowerCase().endsWith('w')) {
        return message.channel.send(':x: You have to specify a valid number of winners!');
      }
      if (parseInt(matches[0]) > 100) return message.channel.send(":x: Winners can't be more than 100")

      let giveawayRequire = arguments[3]

      let nu = 4
      let fako = 0
      if (giveawayRequire.includes(';') || giveawayRequire.toLowerCase() === 'none' || Number(giveawayRequire) || giveawayRequire.match(/(\d+)/)) {
        fako++
      } else {
        reqs = message.guild.roles.everyone.id
        nu = 3
      }

      if (arguments[3].toLowerCase() === 'none') reqs = message.guild.roles.everyone.id
      else {
        if (giveawayRequire.includes(';') || parseInt(giveawayRequire)) {
          let roles = []
          roles.push(arguments[3])
          if (arguments[3].includes(';')) roles = arguments[3].split(';')
          let one = true
          let invalis = []
          roles.forEach((r, i) => {
            if (!message.guild.roles.cache.get(r.replace('[bl]', '').replace('[bypass]', ''))) {
              one = false
              invalis.push(i)
            }
          })
          if (!one) return message.channel.send(`Role${invalis.length !== 1 ? 's' : ''} number ${invalis.map(n => `${n + 1}`).join(', ')} ${invalis.length !== 1 ? 'are' : 'is'} invalid.`)
          let cock = []
          reqs = roles.filter(rr => !rr.endsWith('[bl]') && !rr.endsWith('[bypass]')).map(r => {
            let lol = false
            if (r.includes('[bl]') || r.includes('[bypass]')) return
            if (message.guild.roles.cache.get(r)) {
              if (r.length) {
                return `${r}`
              }


            }



          }).join(';')
          if (!reqs.length) reqs = message.guild.roles.everyone.id

          bls = roles.filter(r => r.endsWith('[bl]')).map(r => {
            if (!r.endsWith('[bl]') || r.includes('[bypass]')) return
            if (message.guild.roles.cache.get(r.replace('[bl]', ''))) {

              return `${r.replace('[bl]', '')}`

            }




          }).join(';')
          bypass = roles.filter(r => r.endsWith('[bypass]')).map(r => {
            if (!r.includes('[bypass]')) return
            if (message.guild.roles.cache.get(r.replace('[bypass]', ''))) {

              return `${r.replace('[bypass]', '')}`

            }




          }).join(';')
          if (!bls.length) bls = ''
          if (!bypass.length) bypass = ''
        }
      }


      let giveawayPrize = arguments.slice(nu).join(' ');

      if (!giveawayPrize) {
        return message.channel.send(':x: You have to specify a valid prize!');
      }
      let vali = ms(giveawayDuration)
      if (!vali) return message.channel.send("Please enter a valid duration.")
      let mapi = reqs.split(';').map(r => {
        if (r !== ' ') {
          return `<@&${r}>`
        }
      }).join(', ')
      let mabl = bls.split(';').map(r => {
        if (r.length) {
          return `<@&${r}>`
        }
      }).join(', ')
      let mab = bypass.split(';').map(r => {
        if (r.length) {
          return `<@&${r}>`
        }
      }).join(', ')
      let testo = [reqs, bls]

      client.giveawaysManager.start(message.channel, {
        time: ms(giveawayDuration),
        prize: '',
        exemptMembers: new Function('member', `let total = 0
        let things = \`${reqs}\`.split(';')
        let turner = true
        things.map(ass => {
          if(member.roles.cache.some(r => r.id === ass.replace('<@&','').replace('>',''))){
            total++
          }
        })
        if(total === things.length) turner = false
        let other = \`${bls}\`.split(';')
        other.map(ass => {
          if(member.roles.cache.some(r => r.id === ass)){
            turner = true
          }
        })
        let by = \`${bypass}\`.split(';')
        by.map(ass => {
          if(member.roles.cache.some(r => r.id === ass)){
            turner = false
          }
        })
        
        return turner
        `),
        bonusEntries: [
          {
            bonus: new Function('member', `
            let bonusr = \`${bonusrole}\`
            let bonuse = \`${bonusentry}\`
            let total = 0
            let has = false
            if(bonusr !== ''){
            bonusr.split(' ').forEach((r, i) => {
              if(member.roles.cache.some(rr => rr.id === r.ID)){
                has = true
                total = total + bonuse.split(' ')[i]
              }
            })
            }
            if(!has) total = null

            return total
            `),
            cumulative: false
          }
        ],
        winnerCount: parseInt(matches[0]),
        hostedBy: message.author,
        extraData: [reqs, bls, giveawayPrize, bypass, 'giveaway'],
        messages: {
          giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
          giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
          timeRemaining: `:timer: Time remaining: **{duration}**!`,
          inviteToParticipate: "**React with 🎉 to to enter the giveaway!**",
          winMessage: `Congratulations, {winners}! You won **${giveawayPrize}**!\n{messageURL}`,
          embedFooter: "Ends at",
          noWinner: "Giveaway cancelled, no valid participations.",
          hostedBy: `:gift: Prize: **${giveawayPrize}**\n🎉 Winner(s): \`${giveawayNumberWinners.match(/(\d+)/)[0]}\`\n:confetti_ball: Hosted by: <@${message.author.id}>\n\n${!reqs.includes(message.guild.roles.everyone.id) ? `Requirements: ${mapi}\n` : ''}${bypass.length ? `Bypass roles: ${mab}\n` : ''}${bls.length ? `Blacklisted roles: ${mabl}` : ''}`,
          winners: `Winner${parseInt(matches[0]) !== 1 ? 's' : ''}`,
          endedAt: "Ended at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
          }
        }
      });
      message.delete()
    } else if (arguments[0].toLowerCase() === 'timer') {
      let timerDuration = arguments[1]
      if (!timerDuration) return message.channel.send(':x: You need to specify a duration.')
      if (!ms(timerDuration)) return message.channel.send(":x: Please enter a valid duration")
      let name = 'Timer'
      if (arguments[2]) name = arguments.slice(2).join(' ')

      client.giveawaysManager.start(message.channel, {
        time: ms(timerDuration),
        prize: ' ',
        exemptMembers: new Function('member', `return true`),
        winnerCount: 1,
        hostedBy: message.author,
        extraData: ['', '', name, '', 'timer'],
        reaction: '⏲️',
        messages: {
          giveaway: ":timer: :timer: **TIMER** :timer: :timer:",
          giveawayEnded: " :timer: :timer: **TIMER ENDED** :timer: :timer:",
          timeRemaining: `:timer: Time remaining: **{duration}**!`,
          inviteToParticipate: `**${name}**`,
          winMessage: `Congratulations, {winners}! You won ****!\n{messageURL}`,
          embedFooter: "Ends at",
          noWinner: "Timer ended",
          hostedBy: ``,
          winners: `Timer`,
          endedAt: "Ended at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
          }
        }
      });
      message.delete()

    } else if (arguments[0].toLowerCase() === 'reroll') {

      if (!arguments[1]) {
        return message.channel.send(':x: You have to specify a valid message ID!');
      }

      let giveaway =
        client.giveawaysManager.giveaways.find((g) => g.messageID === arguments[1] && g.guildID === message.guild.id && g.extraData[4] === 'giveaway');

      // If no giveaway was found
      if (!giveaway) {
        return message.channel.send('Unable to find giveaway');
      }

      // Reroll the giveaway
      client.giveawaysManager.reroll(arguments[1], {
        messages: {
          congrat: `:tada: New winner(s): {winners}! Congratulations, you won **${giveaway.extraData[2]}**!\nhttps://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}`,
          error: `No valid participations, no new winner(s) can be chosen!\nhttps://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}`
        }
      })
        .catch((e) => {
          if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
            message.channel.send('That giveaway didn\'t end yet.');
          } else {
            console.error(e);
            message.channel.send('An error occured...');
          }
        });
    } else if (arguments[0].toLowerCase() === 'end') {


      if (!arguments[1]) {
        return message.channel.send(':x: You have to specify a valid message ID!');
      }
      if (arguments[1].toLowerCase() === 'all') {
        let gaws = client.giveawaysManager.giveaways.filter(g => g.guildID === message.guild.id && g.ended === false && g.extraData[4] === 'giveaway')
        if (!gaws) return message.channel.send("There is no active giveaway.")
        gaws.forEach(gaw => {
          client.giveawaysManager.edit(gaw.messageID, {
            setEndTimestamp: Date.now()
          })
        })
        await message.channel.send(":white_check_mark: | Ending giveaways in less than 5 seconds.")

        return
      }

      let giveaway =
        client.giveawaysManager.giveaways.find((g) => g.messageID === arguments[1] && g.guildID === message.guild.id);

      // If no giveaway was found
      if (!giveaway) {
        return message.channel.send('Please enter a valid giveaway id.');
      }

      // Edit the giveaway
      client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
      })
        // Success message
        .then(() => {
          // Success message
          message.channel.send(`Giveaway will end in less than ${client.giveawaysManager.options.updateCountdownEvery / 1000} seconds.`);
        })
        .catch((e) => {
          if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
            message.channel.send('That giveaway already ended!');
          } else {
            console.error(e);
            message.channel.send('An error occured...');
          }
        });
    } else if (arguments[0].toLowerCase() === 'list') {
      const lists = client.giveawaysManager.giveaways.filter(g => g.guildID === message.guild.id && g.ended === false && g.extraData[4] === 'giveaway')
      const listo = lists.map((gaw, i) => {
        return `\`${i + 1}\` | **ID:** ${gaw.messageID}\n**Prize:** ${gaw.extraData[2]}\n**Giveaway:** [Click here](https://discord.com/channels/${message.guild.id}/${gaw.channelID}/${gaw.messageID})\n**Hosted by:** ${gaw.hostedBy}`
      })
      if (!lists.length) return message.channel.send("There are no active giveaways")
      const FieldsEmbed = new Pagination.FieldsEmbed()
        .setArray(listo)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setElementsPerPage(10)
        .setPageIndicator(true)
        .formatField(`${lists.length} active giveaway${lists.length !== 1 ? 's' : ''}.`, el => el);

      FieldsEmbed.embed
        .setTitle(`Active giveaways.`)
        .setColor(65535)

      FieldsEmbed.build();
    }
    else return message.channel.send("Invalid arguments.")

  }
}
