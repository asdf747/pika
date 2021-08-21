const moment = require('moment')
const { tempban } = require('../funcs')
const { weirdToNormalChars } = require('weird-to-normal-chars')

module.exports = async (client, member) => {
  if(member.guild.id === '655780171496030240'){
    // checking if account is underaged
    if(moment.duration(Date.now() - member.user.createdTimestamp).as('days') < 30){
      // calculating duration
      let duration = 30 * 86400000 - Math.floor(moment.duration(Date.now() - member.user.createdTimestamp).as('days')) * 86400000
      let reason = `Banned for **${Math.floor(moment.duration(duration).as('days'))} days** because account creation below 30 days`
      // tempbanning member
      await tempban(member, member.guild, duration, reason)

      if(member.user.username.match(/[^a-zA-Z0-9]/g)){
        member.setNickname(weirdToNormalChars(member.user.username), 'member has special characters in their username')
      }
    }
  }
}