const moment = require('moment')
const { tempban } = require('../funcs')
const { weirdToNormalChars } = require('weird-to-normal-chars')
const db = require('../funcs')

module.exports = async (client, member) => {
  let alt = await db.fetch(client, `alt_detector_${member.guild.id}`)
  let decancer = await db.fetch(client, `decancer_${member.guild.id}`)
  if(alt){
    // checking if account is underaged
    if(moment.duration(Date.now() - member.user.createdTimestamp).as('days') < 30){
      // calculating duration
      let duration = 30 * 86400000 - Math.floor(moment.duration(Date.now() - member.user.createdTimestamp).as('days')) * 86400000
      let reason = `Banned for **${Math.floor(moment.duration(duration).as('days'))} days** because account creation below 30 days`
      // tempbanning member
      await tempban(member, member.guild, duration, reason)
    }
    // decancering member on join
      if(decancer){
      if(member.user.username.match(/[^a-zA-Z0-9]/g)){
        let cleanednick = weirdToNormalChars(member.user.username)
        member.setNickname(cleanednick.replace(/[^a-zA-Z0-9]/g, ''), 'member has special characters in their username')
      }
    }
  }
}