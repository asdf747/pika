const { listenerCount } = require('events')
const economy = require('../models/economy')
const settings = require('../models/settings')
const db = require('quick.db')
const moment = require('moment')

module.exports = {
    commands: ['bankrob', 'heist'],
    minArgs: 1,
    expectedArgs: '<member>',
    callback: async(message, arguments, text, client) => {
        let unlucky = await db.fetch(`unlucky_${message.author.id}`)
        if(unlucky !== null){
            let dur = moment.duration(Date.now() - unlucky).as('minutes')
            if(dur < 15) return message.channel.send("someone used the unlucky cookie on you so you can't rob or join heists lol")
        }
        let oe = await settings.findOne({ id: message.author.id })
        let settingsauthor = 'false'
        if(oe) settingsauthor = oe.Passive
        if(settingsauthor === 'true') return message.channel.send("You can't heist while being in passive mode")
        let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
        if(!member) return message.channel.send("does this member even exist")
        if(member.id === message.author.id) return message.channel.send("Why tf would you heist your self.")
        let egg = await settings.findOne({ id: member.id })
        let settingsmember = 'false'
        if(egg) settingsmember = egg.Passive
        if(settingsmember === 'true') return message.channel.send("This member is in passive mode")
        let victim_database = await economy.findOne({ id: member.id })
        let victim_bank = 0
        if(victim_database) victim_bank = victim_database.InBank
        let author_database = await economy.findOne({ id: message.author.id })
        let author_bank = 0
        if(author_database) author_bank = author_database.Wallet
        if(victim_bank < 2000) return message.channel.send("the victim doesn't have enough money in his bank")
        if(author_bank < 2000) return message.channel.send("you need to withdraw ***2,000 coins** to join the heist")
        await message.channel.send(`**${message.author.tag}** is heisting **${member.user.tag}** say join heist to join`)
        const filter = x => x.content.toLowerCase() === 'join heist'
        const members = await message.channel.createMessageCollector(filter, { time: 60000 })
        let joined = []
        joined.push(message.author.id)
        db.set(`inheist_${message.author.id}`, true)

        members.on('collect', async m => {
            if(joined.includes(m.author.id)) return m.lineReply("You already joined")
            if(m.author.id === member.id) return m.lineReply("you can't join a heist against yourself dumbo")
            let checking_database = await economy.findOne({ id: m.author.id })
            // checking if member has 2,000 in wallet
            let member_wallet = 500
            if(checking_database) member_wallet = checking_database.Wallet
            if(member_wallet < 2000) return m.lineReply("You need to have **2,000 coins** in your wallet")
            m.react('877589942140813333')
            joined.push(m.author.id)
            db.set(`inheist_${m.author.id}`, true)
        })
        members.on('end', async msgs => {
            let total = 0
            await message.channel.send("Heist ended.")
            if(joined.length === 0) return message.channel.send("Nobody joined the heist")
            if(joined.length < 5) {
                await joined.forEach(async mas => {
                    total++
                    await economy.findOneAndUpdate({ id: mas }, { $inc: {Wallet: -2000} })
                    await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: 2000} })
                    db.set(`inheist_${mas}`, false)
                    
                })
                return message.channel.send(`Heist failed **${total}** people paid 2,000 to **${member.user.tag}**`)
            }
            let reply = ''
            joined.forEach(async msg => {
                let chocking = await economy.findOne({ id: msg })
                let wollet = 500
                if(chocking) wollet = chocking.Wallet
                if(wollet >= 2000){
                    let chances = []
                    for (let i = 0; i < 21; i++){
                        chances.push('fail')
                    }
                    for (let i = 0; i < 15; i++){
                        chances.push('success')
                    }
                    let nou = wollet / 2
                    let checkingchance = Math.floor(Math.random() * Math.floor(chances.length)) 
                    let lose = Math.floor(Math.random() * nou) + 1
        let final = chances[checkingchance]
        if(final === 'fail'){
            db.set(`inheist_${msg}`, false)
            await economy.findOneAndUpdate({ id: msg }, { $inc: {Wallet: -lose} })
            reply += `# ${client.users.cache.get(msg).tag} lost ${lose} coins\n`
        }
        if(final === 'success'){
            let lmao = -victim_bank / joined.length
            await economy.findOneAndUpdate({ id: msg }, { $inc: {Wallet: victim_bank / joined.length} })
            await economy.findOneAndUpdate({ id: member.id }, { $inc: {InBank: -lmao} })
            db.set(`inheist_${msg}`, false)
            reply += `+ ${client.users.cache.get(msg).tag} got ${victim_bank / joined.length}\n`
        }
        message.channel.send(`\`\`\`diff\n${reply}\`\`\``)
                }
            })
        })
    }
}