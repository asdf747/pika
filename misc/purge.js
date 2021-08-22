const { MessageEmbed } = require('discord.js')
const react = ['reactions', 'reaction']

module.exports = {
  commands: ['purge', 'pu'],
  minArgs: 1,
  expectedArgs: '<amount>',
  permissions: "MANAGE_MESSAGES",
  permissionError: "You can't manage messages.",
  permissionsbot: "MANAGE_MESSAGES",
  description: 'Deletes a specific amount of messages',
  subCommands: 'reaction bot all',
  callback: async (message, arguments, text, client) => {
    const mem = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
    

    if(react.includes(arguments[0].toLowerCase())){
      const talkedRecently1 = new Set();
    if (talkedRecently1.has(message.author.id)) {
            return
    } else {
      let total = 0
     message.channel.messages.fetch({ limit: 25 }).then(messages => {
                    messages.forEach(msg => {
                      let gas = msg.reactions.cache.map(r => r)
                      if(gas.length){
                        msg.reactions.cache.forEach(reaction => {
                          total++
                          reaction.remove()
                        })
                      }
                    })
                    
                    
                  
                  
        }).then(async () => message.channel.send(`Removed **${total}** reaction${total !== 1 ? 's' : ''}.`).then(msg => msg.delete({ timeout: 2000 })))
        .catch(console.error)
    }
    talkedRecently1.add(message.author.id);
        setTimeout(() => {
          talkedRecently1.delete(message.author.id);
        }, 3000);
        message.delete()
        return
    }
    if(arguments[0].toLowerCase() === 'bot'){
      
const talkedRecently = new Set();
    if (talkedRecently.has(message.author.id)) {
            return
    } else {
      let total = 0
    message.channel.messages.fetch({ limit: 25 }).then(messages => {
                    let deleting = messages.filter(m => m.author.bot)
                    let lengther = deleting.map(m => m.id)
                    if(!lengther.length) return
                    let leng = deleting.map(a => `${a.author.id}`)
                    deleting.forEach(me => {
                      total++
                      me.delete()
                      
                    })

                    
                  
                  
        }).then(async () => message.channel.send(`Deleted **${total}** message${total !== 1 ? 's' : ''}.`).then(msg => msg.delete({ timeout: 2000 })))
        .catch(console.error)
  }
  talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 3000);
        message.delete()
        return
    }else if(mem){
    
    
    const AllMessages = await message.channel.messages.fetch()
    let Filtered = await AllMessages.filter(m => m.author.id === mem.id)
    let deleted = 0
    if(!Filtered) return
    if(arguments[1].toLowerCase() === 'all'){
Filtered.forEach(msg => {
  total++
      msg.delete()
    })


        message.delete()
    return
    }
const amount = +arguments[1]
      if(!amount) return message.channel.send('Please enter a valid amount')
      if(amount > 100) return message.channel.send(
      new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor(15158332)
      .setDescription(`:x: I can't delete more than 100 messages.`)
    )
    if(isNaN(arguments[1])) return
    Filtered.forEach(msg => {
      if(deleted >= amount) return
      msg.delete()
      deleted++
    })
    message.delete()

    }else {
      message.channel.messages.fetch().then((results) => {
      if(arguments[0].toLowerCase() === "all"){
        message.channel.bulkDelete(results)
        message.delete()
    }

    const amount = +arguments[0]
    let mapper = results.map(a => a.id)
    if(amount > mapper.length) return;
    if(amount > 100) return message.channel.send(
      new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor(15158332)
      .setDescription(`:x: I can't delete more than 100 messages.`)
    )
    if(isNaN(arguments[0])) return;
    message.channel.bulkDelete(amount+1)
    message.delete()

      })

  }
  }
}