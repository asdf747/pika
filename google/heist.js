const { listenerCount } = require('events')
const economy = require('../models/economy')
const settings = require('../models/settings')
const { Database } = require("quickmongo");
const Pagination = require('discord-paginationembed')
const db = new Database("mongodb+srv://lol:fofo29112007@golgo.t3bmd.mongodb.net/gg?retryWrites=true&w=majority");
const moment = require('moment')
const { MessageEmbed } = require('discord.js')

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
            let unlucky_collector = await db.fetch(`unlucky_${m.author.id}`)
            if(unlucky_collector !== null){
                let durg = moment.duration(Date.now() - unlucky_collector).as('minutes')
                if(durg < 15) return m.channel.send("someone used the unlucky cookie on you so you can't rob or join heists lol")
            }
            if(joined.includes(m.author.id)) return m.lineReply("You already joined")
            if(m.author.id === member.id) return m.lineReply("you can't join a heist against yourself dumbo")
            let checking_database = await economy.findOne({ id: m.author.id })
            // checking if member has 2,000 in wallet
            let member_wallet = 500
            if(checking_database) member_wallet = checking_database.Wallet
            if(member_wallet < 2000) return m.lineReply("You need to have **2,000 coins** in your wallet")
            m.react('🏦')
            joined.push(m.author.id)
            db.set(`inheist_${m.author.id}`, true)
        })
        members.on('end', async msgs => {
            let total = 0
            let totalavail = 0
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
            let gely = []

            for (let i = 0; i < joined.length; i++){
                if(totalavail >= 20){
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle('Heist results')
                        .setDescription(gely.map(a => a).join('\n'))
                        .setTimestamp()
                        .setColor("GREEN")
                        .setThumbnail(message.guild.iconURL() || null)
                    )
                    totalavail = 0
                    gely = []
                }
                let chocking = await economy.findOne({ id: joined[i] })
                let wollet = 500
                if(chocking) wollet = chocking.Wallet
                    let chances = []
                    for (let i = 0; i < 21; i++){
                        chances.push('fail')
                    }
                    for (let i = 0; i < 20; i++){
                        chances.push('success')
                    }
                    let nou = wollet / 2
                    let checkingchance = Math.floor(Math.random() * Math.floor(chances.length)) 
                    let lose = Math.floor(Math.random() * nou) + 1
        let final = chances[checkingchance]
            if(final === 'fail'){
                db.set(`inheist_${joined[i]}`, false)
                await economy.findOneAndUpdate({ id: joined[i] }, { $inc: {Wallet: -lose} })
                 gely.push(`**# ${client.users.cache.get(joined[i]).tag}**\n*lost ${parseInt(lose).toLocaleString("en-US")} coins*\n`)
            }
            if(final === 'success'){
                let lmao = victim_bank / joined.length
                await economy.findOneAndUpdate({ id: joined[i] }, { $inc: {Wallet: victim_bank / joined.length} })
                await economy.findOneAndUpdate({ id: member.id }, { $inc: {InBank: -victim_bank / joined.length} })
                db.set(`inheist_${joined[i]}`, false)
                gely.push(`**+ ${client.users.cache.get(joined[i]).tag}**\n*got ${parseInt(victim_bank / joined.length).toLocaleString("en-Us")} coins*\n`)
            }
            totalavail++
            total++
        
            }

            if(gely.length){
                message.channel.send(
                    new MessageEmbed()
                    .setTitle('Heist results')
                    .setDescription(gely.map(a => a).join('\n'))
                    .setTimestamp()
                    .setColor("GREEN")
                    .setThumbnail(message.guild.iconURL() || null)
                )
            }
            
        })
    }
}