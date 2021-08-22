const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://dbbb:fofo29112007@bot.ibj0v.mongodb.net/DiscordBot?retryWrites=true&w=majority");
const Discord = require('discord.js')
require('discord-reply')
const UserInfo = require('../models/whitelist')
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
    permissions = [],
    description = '',
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

  // Listen for messages
  client.on('message', async (message) => {
    const { member, content, guild } = message
    if(message.channel.type === 'dm') return
    if (message.author.bot) return;
    let config = require('../config.json')
    let prefixx = await db.fetch(`prefix_${message.guild.id}`)
    if(!prefixx){prefixx = config.prefix}
    




  


 


    for (const alias of commands) {
      const command = `${prefixx}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        // A command has been ran
        const urmom = new Date()
        const doc = await UserInfo.findOne({ id: message.author.id })
        if(!doc) return;
        if(!doc.Permanent && urmom > doc.Expire) {
          doc.delete()
          return message.lineReplyNoMention("Your whitelist expired.")
          }
        
        

          const track = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setTitle(`${typeof commands === 'string' ? commands : commands[0]}`)
          .setURL(`${message.url}`)
          .setDescription(`\`\`\`${message}\`\`\``)
          .setFooter(`ID: ${message.author.id}`)
          .setTimestamp()

        
        

        // Ensure the user has the required permissions
        if(disabled === true) return;

        if(type.toLowerCase() === 'guildonly'){
          const check = client.guilds.cache.get(guildID)
          if(!check) return console.log("Invalid guild ID.")
            if(message.guild.id != `${gulidID}`) return;
          }

        for (const permission of permissions) {
          
          if (!member.hasPermission(permission)) {
            message.lineReply(permissionError)
            return
          }
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command.`
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
const lick =
        typeof commands === 'string'
          ? commands
          : commands[0]
          if(lick !== 'history'){
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
          }


        callback(message, arguments, arguments.join(' '), client)

        return
      }
      
    }
    
  })
  
  
}
