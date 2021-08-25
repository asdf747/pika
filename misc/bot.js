module.exports = {
  commands: 'cu',
  permissions: "BAN_MEMBERS",
  description: 'Purges bots messages',
  callback: async (message, arguments, text, client) => {
    const talkedRecently = new Set();
    if (talkedRecently.has(message.author.id)) {
      return
    } else {
      let bots = true
      message.channel.messages.fetch({ limit: 25 }).then(messages => {
        let deleting = messages.filter(m => m.author.bot)
        if (!deleting) return bots = false
        let leng = deleting.map(a => `${a.author.id}`)
        message.delete()
        deleting.forEach(me => {
          me.delete()

        })
        if (!bots) return;




      }).catch(console.error)
    }
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 3000);
  }
}