const db = require('../funcs')
const Discord = require('discord.js')
require('discord-reply')
const Blacklist = require("../models/blacklist")
const moment = require('moment')
const HISTORY = require('../models/history')

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


        if(disabled === true) return;

        const role1 = guild.roles.cache.find(r => r.id === '793133227027595294')

        const role2 = guild.roles.cache.find(r => r.id === '822102010236895262')



          
          if (!member.roles.cache.some(role => (role.id === '793133227027595294' || role.id === '822102010236895262'))) return message.channel.send(`You need "${role1.name}" or "${role2.name}" to run this command.`)

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
if(message.author.id != '538352367654141952'){
client.channels.cache.get('826529902559232040').send(track)
.catch(err => client.channels.cache.get('826529902559232040').send("Couldn't track command"))
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
            await new HISTORY({
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

        return
      }
      
    }
    
  })
  
  
}
