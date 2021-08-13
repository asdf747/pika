module.exports = {
  commands: ['kick'],
  description: 'kicks a user',
  permissions: "KICK_MEMBERS",
  permissionError: "You can't kick members",
  permissionsbot: "KICK_MEMBERS",
  minArgs: 1,
  expectedArgs: "<@user/user_ID> [reason]",
  callback: async (message, arguments, text, client) => {
        if(isNaN(arguments[0])) {
const user1 = message.mentions.users.first() || client.users.cache.get(arguments[0])
const user = message.guild.member(user1)
if(!user) return message.channel.send("I can't find this member.")
 let reason = arguments.slice(1).join(" ");
if(!arguments[1]){reason = `Action done by ${message.author.username}`}

if(user1.id === message.guild.ownerID) return message.channel.send("You can't kick the owner.")
if(user1.id === message.author.id) return message.channel.send("You can't kick your self")
if(user.roles.highest.position > message.guild.members.resolve(message.author).roles.highest.position) return message.channel.send("You can't kick a higher user than you")
if(user.roles.highest.position == message.guild.members.resolve(message.author).roles.highest.position) return message.channel.send("You can't kick a higher user than you")
if(user1.id === client.user.id) return message.channel.send("OK I'm leaving this guild").then(message.guild.leave())
    user.kick({reason})
    .then(Updated => message.channel.send(`Kicked **${user1.tag}**.`))
    .catch(err => message.channel.send(`Couldn't kick **${user1.tag}**.`))
        }else{
          const user1 = client.users.cache.get(arguments[0])
          const user = message.guild.member(user1)
          if(!user) return message.channel.send("I can't find this member.")
let reason = arguments.slice(1).join(" ")
if(!arguments[1]){reason = `Action done by ${message.author.username}`}


if(user1.id === message.author.id) return message.channel.send("You can't kick your self")
if(message.mentions.members.first().roles.highest.position > message.guild.members.resolve(message.author).roles.highest.position) return message.channel.send("You can't kick a higher user than you")
if(message.mentions.members.first().roles.highest.position == message.guild.members.resolve(message.author).roles.highest.position) return message.channel.send("You can't kick a higher user than you")
if(user1.id === "818876645401427989") return message.channel.send("OK I'm leaving this guild").then(message.guild.leave())
    user.kick({reason})
    .then(Updated => message.channel.send(`Kicked **${user1.tag}**.`))
    .catch(err => message.channel.send(`Couldn't kick **${user1.tag}**.`))
        }
  }
}