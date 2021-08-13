const config = require('../config.json')
const activity = `${config.prefix}help`
const loadCommands = require('../help/load-commands')
const loadCommands2 = require('../moderation/load-commands')
const loadCommands3 = require('../owner/load-commands')
const loadCommands4 = require('../utility/load-commands')
const loadCommands5 = require('../misc/load-commands')
const loadCommands6 = require('../whitelisted/load-commands')
const loadCommands7 = require('../fun/load-commands')
const loadCommands8 = require('../the-poor-guild-only/load-commands')
const loadCommands9 = require('../donations-thepoor/load-commands')
const loadCommands10 = require('../fungame/load-commands')
const Discord = require('discord.js')
const schedule = require('node-schedule')

module.exports = async (client) => {
  

    console.log(`Logged in as ${client.user.username} (${client.user.id})`)
    client.user.setPresence({
  activity: {
    name: activity,
    type: "PLAYING",
  },
})

function getUsers() {
  let guilds = client.guilds.cache.array();

  for (let i = 0; i < guilds.length; i++) {
    client.guilds.cache.get(guilds[i].id).members.fetch().then(r => {
    });
  }
}
    
    console.log(`Set bot's activity to ${activity}`)
    loadCommands(client)
    loadCommands2(client)
    loadCommands3(client)
    loadCommands4(client)
    loadCommands5(client)
    loadCommands6(client)
    loadCommands7(client)
    loadCommands8(client)
    loadCommands9(client)
    loadCommands10(client)

getUsers()

schedule.scheduleJob('*/30 * * * *', function(){
  client.channels.cache.get('809824294216400926').messages.fetch('875397922215297034').then(msg => {
    const roles = '783741126422560809,783741208270077975,783741256458567700,783744934259458105,790259557490360400,783741322007281705,823943599183233095,783741544107737099,785341759634276364,798636723185778738,798618716102590464,798636849877876746,783741061406392360,799132388302913556,786213668517314571,792749154128101386,795200451137634315,786205466258702386'
    msg.edit(
      new Discord.MessageEmbed()
      .setTitle("Roles member count.")
      .setDescription(roles.split(',').map(role => {
        return `**<@&${client.guilds.cache.get('655780171496030240').roles.cache.get(role).id}>** - ${parseInt(client.guilds.cache.get('655780171496030240').roles.cache.get(role).members.size).toLocaleString("en-US")}`
      }))
    )
  })
})
  

}