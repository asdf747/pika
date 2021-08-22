module.exports = {
  commands: ['setnickname', 'setnick'],
  permissions: "MANAGE_NICKNAMES",
  permissionError: "You can't manage nicknames.",
  description: 'Changes the nickname of a user.',
  minArgs: 2,
  permissionsbot: "MANAGE_NICKNAMES",
  expectedArgs: '<user> <new_nickname>',
  callback: async (message, arguments, text, client) => {
const user = message.mentions.users.first() || client.users.cache.get(arguments[0])
const member = message.guild.member(user)
if(!member) return message.lineReplyNoMention("Invalid user")
if(member.roles.highest.position >= message.guild.me.roles.highest.position) return message.lineReply("I can't change this user's nickname.")
if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply("You can't change this user's nickname.")
const content = arguments.slice(1).join(" ");
member.setNickname(content, `Action done by ${message.author.id}`)
.then(Updated => message.lineReplyNoMention(`Changed **${user.tag}'s** nickname to **${content}**`)
)
      

  }
}