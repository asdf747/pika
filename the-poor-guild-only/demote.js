module.exports = {
  commands: 'demote',
  description: "Removes all the staff roles from member.",
  minArgs: 1,
  expectedArgs: '<member>',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text, client) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
    let roles = '807853735282737193,797760448560758814,783766633519906846,792793362989187132,783745292590645269,786510942477221919,820341683455131758,797776577818918932,812939902051155999,783745136873439302,783745172261175327,812939944733179915,783745205684666419,838014215930380288,809982354616746034,823929654263545856,792093227603066881,817393794835415111,783766428897378314'
    let total = 0
    roles.split(',').forEach(role => {
      if(message.guild.roles.cache.get(role)){
        const rol = message.guild.roles.cache.get(role)
        if(member.roles.cache.some(r => r.id === role)){
        member.roles.remove(rol)
        total++
        }
      }
    })
    await message.channel.send(`Removed **${total}** staff roles from member.`)
    
  }
}