const moment = require('moment')
const { tempban } = require('../funcs')
const { weirdToNormalChars } = require('weird-to-normal-chars')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://lol:fofo29112007@golgo.t3bmd.mongodb.net/gg?retryWrites=true&w=majority")

module.exports = async (client, member) => {
  let alt = await db.fetch(`alt_detector_${member.guild.id}`)
  if(alt){
    // checking if account is underaged
    if(moment.duration(Date.now() - member.user.createdTimestamp).as('days') < 30){
      // calculating duration
      let duration = 30 * 86400000 - Math.floor(moment.duration(Date.now() - member.user.createdTimestamp).as('days')) * 86400000
      let reason = `Banned for **${Math.floor(moment.duration(duration).as('days'))} days** because account creation below 30 days`
      // tempbanning member
      await tempban(member, member.guild, duration, reason)
    }
      if(member.guild.id === '655780171496030240'){
      if(member.user.username.match(/[^a-zA-Z0-9]/g)){
        let cleanednick = weirdToNormalChars(member.user.username)
        member.setNickname(cleanednick.replace(/[^a-zA-Z0-9]/g, ''), 'member has special characters in their username')
      }
    }
  }
}