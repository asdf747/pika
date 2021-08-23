const Discord = require('discord.js')
require('discord-reply')
const Blacklist = require("../models/blacklist")
const moment = require('moment')
const REQUIRED = require('../models/toggle')
const HISTORY = require('../models/history')
const TOGGLE = require('../models/dis')
const db = require('../funcs')
const { convertMS } = require("discordutility");

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = '',
    permissionError = 'You do not have permission to run this command.',
    minArgs = 0,
    disabled = false,
    type = 'all',
    guildID = 0,
    cooldown = 0,
    subCommands = '',
    description = '',
    permissions = [],
    permissionsbot = [],
    requiredRoles = [],
    callback,
  } = commandOptions

  // Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands]
  }

  console.log(`Loaded command "${commands[0]}"`)

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  if (permissionsbot.length) {
    if (typeof permissionsbot === 'string') {
      permissionsbot = [permissionsbot]
    }

    validatePermissions(permissionsbot)
  }

  // Listen for messages
  client.on('message', async (message) => {
    const { member, content, guild } = message
    if(message.channel.type === 'dm') return
    if (message.author.bot) return;
    let config = require('../config.json')
    let prefixxp = await client.prefixes.get(message.guild.id)
    let prefixx = config.prefix
    if(prefixxp){prefixx = prefixxp[0].Prefix}







  


 


    for (const alias of commands) {
      const command = `${prefixx}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        // A command has been ran
        let total = false
let fond = false
        await REQUIRED.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data){
            const mainCommand =
        typeof commands === 'string'
          ? commands
          : commands[0]
          
          let findcmd = data.Cmds.find(e => e.Command === mainCommand)
          if(findcmd) fond = true
            if(findcmd){

              findcmd.Roles.forEach(role => {
                if(message.member.roles.cache.some(r => r.id === role)){
                        total = true
                      }
              })
                
              
            }
            
          }
        })
       if(fond && !total) return;
        

        const dote = new Date()
        let doc = await Blacklist.findOne({ id: message.author.id })
        if(doc){
if(dote > doc.Expire) doc.delete()
        }
        
        if(doc) {
      
          const expiredate = moment(doc.Expire).fromNow()
          return message.lineReplyNoMention(`You're blacklisted from using this bot. Reason: \`${doc.reason}\` your blacklist ends ${expiredate}`)
        }

        
const track = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(`${typeof commands === 'string' ? commands : commands[0]}`)
        .setURL(`${message.url}`)
        .setDescription(`\`\`\`${message}\`\`\``)
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp()

        
        

        // Ensure the user has the required permissions

        if(type.toLowerCase() === 'guildonly'){
          const check = client.guilds.cache.get(`${guildID}`)
          if(!check) return console.log("Invalid guild ID.")
            if(message.guild.id != `${guildID}`) return;
          }
          if(message.guild.id !== '854748129365721118') return;


        if(disabled === true) return;




       let diso = false
        let dop = await TOGGLE.findOne({ Guild: message.guild.id })
        if(dop){
          if(dop.Cmds.length){
          const gas =
        typeof commands === 'string'
          ? commands
          : commands[0]
          let fino = dop.Cmds.find(e => e.Command === gas)
          if(fino){
            if(fino.Disabled === true) diso = true
          }
          }
        }
        if(diso) return;

        for (const permission of permissions) {
          
          if (!member.hasPermission(permission)) {
            message.lineReply(
              new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor(15158332)
      .setDescription(`:x: ${permissionError}`)
            )
            return
          }
        }

        for (const permission of permissionsbot) {
          
          if (!message.guild.me.hasPermission(permission)) {
            message.lineReply(
              new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor(15158332)
      .setDescription(`:x: Missing permissions.`)
            )
            return
          }
        }
        let kek = true
        
        const arguments = content.split(/[ ]+/)
        const args = arguments

        arguments.shift()

        if (
          arguments.length < minArgs
        ) {
          message.lineReplyNoMention(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor("RED")
      .setTimestamp()
      .setFooter(message.guild.name)
      .setThumbnail(message.guild.iconURL() || null)
      .setDescription(`:x: Missing arguments please use the syntax below.\n\n\`\`\`${prefixx}${alias} ${expectedArgs}\`\`\`\n\n${description !== '' ? `**Description:**\n${description}\n\n` : ''}${subCommands.length ? `**Sub commands:**\n${subCommands.split(/[ ]+/).map(a => `\`${a}\``).join(' ')}\n\n` : ''}${permissions.length ? `**Required Permissions:**\n${permissions[0]}` : ''}`)
          )
          
          return
        }
        let cool = cooldown * 1000
        let lasttime = await db.fetch(client, `${typeof commands === 'string' ? commands : commands[0]}_${message.author.id}`)
        if(cooldown > 0 && lasttime !== null && cool - (Date.now() - lasttime) > 0){
          const timeObj = convertMS(cool - (Date.now() - lasttime))
          return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle("Cooldown!")
            .setTimestamp()
            .setColor(15158332)
            .setDescription(`:x: You're on a cooldown you need to wait \`${timeObj.d !== 0 ? `${timeObj.d} day${timeObj.d !== 1 ? 's' : ''} ` : ''}${timeObj.h !== 0 ? `${timeObj.h} hour${timeObj.h !== 1 ? 's' : ''} ` : ''}${timeObj.m !== 0 ? `${timeObj.m} minute${timeObj.m !== 1 ? 's' : ''} ` : ''}${timeObj.s !== 0 ? `${timeObj.s} second${timeObj.s !== 1 ? 's' : ''}` : ''}\` to be able to use this command again`)
          )
        }
        if(fond && total && !diso && message.guild.id === '854748129365721118' && kek || !fond && !total && !diso && message.guild.id === '854748129365721118' && kek){
if(message.author.id != '538352367654141952'){
client.channels.cache.get('826529902559232040').send(track)
.catch(err => client.channels.cache.get('826529902559232040').send("Couldn't track command"))
}

if(cooldown > 0){
  await db.set(client, `${typeof commands === 'string' ? commands : commands[0]}_${message.author.id}`, Date.now())
}

await HISTORY.findOne({ Guild: message.guild.id, User: message.author.id }, async (err, data) => {
          if(data){
            const mon =
        typeof commands === 'string'
          ? commands
          : commands[0]
            let obj = {
              Command: mon,
              Args: arguments.join(' '),
              Date: new Date()
            }
            data.Cmds.push(obj)
            data.save()
          }if(!data){
            const mon =
        typeof commands === 'string'
          ? commands
          : commands[0]
             new HISTORY({
              Guild: message.guild.id,
              User: message.author.id,
              Cmds: [
                {
                  Command: mon,
                  Args: arguments.join(' '),
                  Date: new Date()
                }
              ]
            }).save()
          }
        })



        callback(message, arguments, arguments.join(' '), client)
        
}

        return
      }
      
    }
    
  })
  
  
}

