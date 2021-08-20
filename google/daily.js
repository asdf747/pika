const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const { Database } = require('quickmongo')

module.exports = {
    commands: 'daily',
    cooldown: 86400,
    callback: async(message, arguments, text, client) => {
        const db = new Database(client.db)
        let bonus = await db.fetch(`bonus_daily_${message.author.id}`)
        if(!bonus) await db.set(`bonus_daily_${message.author.id}`, 0)
        let lastdaily = await db.fetch(`daily_${message.author.id}`)
        let streak = await db.fetch(`daily_streak_${message.author.id}`)
        if(!streak) streak = 0
        if(streak !== null && moment.duration(Date.now() - lastdaily).as('days') >= 2) await db.set(`daily_streak_${message.author.id}`, 0)
        if(bonus !== null && moment.duration(Date.now() - lastdaily).as('days') < 2) await db.add(`bonus_daily_${message.author.id}`, 2000)
        if(bonus !== null && moment.duration(Date.now() - lastdaily).as('days') >= 2) await db.set(`bonus_daily_${message.author.id}`, 0)
        
        bonus = await db.fetch(`bonus_daily_${message.author.id}`)
        streak = await db.fetch(`daily_streak_${message.author.id}`)
        let amount = 10000 + bonus
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                
                message.channel.send(
                    new MessageEmbed()
                    .setTitle("Claimed daily")
                    .setDescription(`You've claimed your daily and got **${amount.toLocaleString("en-US")}**`)
                    .setFooter(`Streak: ${streak} (+${bonus})`)
                    .setColor("BLUE")
                )
                await db.add(`daily_streak_${message.author.id}`, 1)
            }if(!data){
                await new economy({
                    id: message.author.id,
                    Wallet: 500,
                    Bank: 100,
                    InBank: 0
                }).save().then(async () => {
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                    
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle("Claimed daily")
                        .setDescription(`You've claimed your daily and got **${amount.toLocaleString("en-US")}**`)
                        .setFooter(`Streak: ${streak} (+${bonus})`)
                        .setColor("BLUE")
                    )
                    await db.add(`daily_streak_${message.author.id}`, 1)
                })
            }
        })

    }
}