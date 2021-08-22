const backup = require("discord-backup");

module.exports = {
  commands: 'backup',
  minArgs: 1,
  expectedArgs: 'create',
  subCommands: 'load remove list',
  callback: async (message, arguments, text, client) => {
    backup.setStorageFolder(__dirname+"/../backups/");
    if('add'.includes(arguments[0].toLowerCase())){
message.channel.send("Creating Server Backup... This may take a few seconds.")
backup.create(message.guild).then((backupData) => {
    message.channel.send(`Created backup here is the ID ${backupData.id}`); 
});
    } else if('load'.includes(arguments[0].toLowerCase())){
      if(!arguments[1]) return message.lineReply("Please enter a valid backup ID.")
      backup.load(arguments[1], message.guild).then(() => {
    backup.remove(arguments[1]); 
});
    } else if('remove'.includes(arguments[0].toLowerCase())){
      if(!arguments[1]) return message.lineReply("Please enter a valid backup ID.")
      backup.remove(arguments[1]);
    } else if('list'.includes(arguments[0].toLowerCase())){
      backup.list().then((backups) => {
    message.channel.send(backups.map(a => a)); // Expected Output [ "BC5qo", "Jdo91", ...]
});

    } else return message.lineReplyNoMention("Invalid arguments.")
    
  }
}