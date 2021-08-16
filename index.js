const express = require('express')
const app = express()

app.get("/", (req, res) => {
  res.send("Starting.")
})
app.listen(3000, () => {
  console.log("Starting Pika...")
})

const Discord = require('discord.js')
require('discord-reply');
const client = new Discord.Client({ intents: Discord.Intents.ALL, getAllUsers: true, shards: 'auto', restTimeOffset: 0, fetchAllMembers: true});
require('discord-buttons')(client)
const config = require('./config.json')
const fs = require('fs')
const path = require('path')
const db = require('quick.db')
const { connect, Schema, model } = require('mongoose')
const mongoose = require('mongoose')
const mongo = require('./mongo')
require('events').EventEmitter.defaultMaxListeners = 0;
const moment = require('moment')
const backup = require("discord-backup");

moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'a few seconds',
        ss : '%d seconds',
        m:  "a minute",
        mm: "%d minutes",
        h:  "an hour",
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        w:  "a week",
        ww: "%d weeks",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    }
});

client.settings = {
  owner: "538352367654141952"
}

const { GiveawaysManager } = require('discord-giveaways');

const giveawaySchema = new mongoose.Schema({
  messageID: String,
  channelID: String,
  guildID: String,
  startAt: Number,
  endAt: Number,
  ended: Boolean,
  winnerCount: Number,
  prize: String,
  messages: {
      giveaway: String,
      giveawayEnded: String,
      inviteToParticipate: String,
      timeRemaining: String,
      winMessage: String,
      embedFooter: String,
      noWinner: String,
      winners: String,
      endedAt: String,
      hostedBy: String,
      units: {
          seconds: String,
          minutes: String,
          hours: String,
          days: String,
          pluralS: Boolean,
      },
  },
  hostedBy: String,
  winnerIDs: [String],
  reaction: mongoose.Mixed,
  botsCanWin: Boolean,
  embedColor: mongoose.Mixed,
  embedColorEnd: mongoose.Mixed,
  exemptPermissions: [],
  exemptMembers: String,
  bonusEntries: String,
  extraData: mongoose.Mixed,
  lastChance: {
      enabled: Boolean,
      content: String,
      threshold: Number,
      embedColor: mongoose.Mixed
  }
});
const giveawayModel = mongoose.model('giveaways', giveawaySchema);
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  // This function is called when the manager needs to get all giveaways which are stored in the database.
  async getAllGiveaways() {
      // Get all giveaways from the database. We fetch all documents by passing an empty condition.
      return await giveawayModel.find({});
  }

  // This function is called when a giveaway needs to be saved in the database.
  async saveGiveaway(messageID, giveawayData) {
      // Add the new giveaway to the database
      await giveawayModel.create(giveawayData);
      // Don't forget to return something!
      return true;
  }

  // This function is called when a giveaway needs to be edited in the database.
  async editGiveaway(messageID, giveawayData) {
      // Find by messageID and update it
      await giveawayModel.findOneAndUpdate({ messageID: messageID }, giveawayData).exec();
      // Don't forget to return something!
      return true;
  }

  // This function is called when a giveaway needs to be deleted from the database.
  async deleteGiveaway(messageID) {
      // Find by messageID and delete it
      await giveawayModel.findOneAndDelete({ messageID: messageID }).exec();
      // Don't forget to return something!
      return true;
  }
};

client.giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: 8571344,
        embedColorEnd: "#000000",
        endedGiveawaysLifetime: 864000000,
        reaction: "🎉"
    }
});

client.giveawaysManager.on("endedGiveawayReactionAdded", (giveaway, member, reaction) => {
  client.guilds.cache.get(giveaway.guildID).channels.cache.get(giveaway.channelID).messages.fetch(giveaway.messageID).then(msg => {
    msg.reactions.resolve('🎉').users.remove(member.id)
  })
})

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  let total = 0
  let ast = 0
  let bypass = false
  if(giveaway.extraData[4] === 'giveaway'){
  giveaway.extraData[3].split(';').forEach(ass => {
    if(member.roles.cache.some(r => r.id === ass)){
      bypass = true
    }
  })
      giveaway.extraData[0].split(';').forEach(ass => {
          if(member.roles.cache.some(r => r.id === ass.replace('<@&','').replace('>',''))){
            total++
          }
        })
        if(total !== giveaway.extraData[0].split(';').length && !bypass){
          client.guilds.cache.get(giveaway.guildID).channels.cache.get(giveaway.channelID).messages.fetch(giveaway.messageID).then(msg => {
            msg.reactions.resolve('🎉').users.remove(member.id)
          })
        }
        giveaway.extraData[1].split(';').forEach(ass => {
          if(member.roles.cache.some(r => r.id === ass.replace('<@&','').replace('>',''))){
            ast++
          }
        })
        if(ast > 0 && !bypass){
client.guilds.cache.get(giveaway.guildID).channels.cache.get(giveaway.channelID).messages.fetch(giveaway.messageID).then(msg => {
            msg.reactions.resolve('🎉').users.remove(member.id)
          })
        }
  }
  
});




client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  if(giveaway.extraData[4] === 'giveaway'){
  if(winners.length >= 1){
    client.guilds.cache.get(giveaway.guildID).members.cache.get(giveaway.hostedBy.replace('<@', '').replace('>','')).send(
      new Discord.MessageEmbed()
      .setTitle(`Your giveaway **${giveaway.extraData[2]}** in ${client.guilds.cache.get(giveaway.guildID).name} ended`)
      .setDescription(`**Link:** [Click here](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})\n**${winners.length} winner${winners.length !== 1 ? 's' : ''}:**\n${winners.map(m => `**${m.user.tag}** (${m.id})`).join('\n')}`)
      .setColor(8571344)
      .setFooter(`ID: ${giveaway.messageID}`)
    )

    winners.forEach(m => {
      if(m.id !== giveaway.hostedBy.replace('<@','').replace('>','')){
      m.send(
        new Discord.MessageEmbed()
      .setTitle(`You won **${giveaway.extraData[2]}** in ${client.guilds.cache.get(giveaway.guildID).name}`)
      .setDescription(`**Link:** [Click here](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})`)
      .setColor(8571344)
      .setFooter(`ID: ${giveaway.messageID}`)
      )
    }
    })
    
  }
  if(winners.length === 0){
  client.guilds.cache.get(giveaway.guildID).channels.cache.get(giveaway.channelID).send(`no valid participations.`)
  }
  }
  if(giveaway.extraData[4] === 'timer'){
    if(winners.length === 0){
      client.guilds.cache.get(giveaway.guildID).channels.cache.get(giveaway.channelID).send(`The timer for **${giveaway.extraData[2]}** ended\nhttps://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}`)
    }
  }
  
});


const loadEvents = require('./events.js')

const load = async () => {
  await loadEvents.run(client)
}

client.snipes = new Discord.Collection();
client.esnipes = new Discord.Collection();


  

    





load()
client.login('ODE4ODc2NjQ1NDAxNDI3OTg5.YEecTg.Mc4dqg0WLkMlL7JHq-LNCZh3xeY')