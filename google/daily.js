const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const db = require('../funcs')

module.exports = {
    commands: 'daily',
    cooldown: 86400,
    callback: async(message, arguments, text, client) => {
        let bonus = await db.fetch(client, `bonus_daily_${message.author.id}`)
        if(!bonus) await db.set(client, `bonus_daily_${message.author.id}`, 0)
        let lastwork = await db.fetch(client, `last_daily_${message.author.id}`)
        if(bonus !== null && moment.duration(Date.now() - lastwork).as('days') < 2) await db.add(`bonus_daily_${message.author.id}`, 2000)
        if(bonus !== null && moment.duration(Date.now() - lastwork).as('days') >= 2) await db.set(client, `bonus_daily_${message.author.id}`, 0)
        
        bonus = await db.fetch(client, `bonus_daily_${message.author.id}`)
        let amount = 10000 + bonus
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                
                message.channel.send(
                    new MessageEmbed()
                    .setTitle("Claimed daily")
                    .setDescription(`You've claimed your daily and got **${amount.toLocaleString("en-US")}**`)
                    .setFooter(`Streak: ${bonus / 2000} (+${bonus})`)
                    .setColor("BLUE")
                )
                await db.set(client, `last_daily_${message.author.id}`, Date.now())

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
                        .setFooter(`Streak: ${bonus / 2000} (+${bonus})`)
                        .setColor("BLUE")
                    )
                    await db.set(client, `last_daily_${message.author.id}`, Date.now())
                })
            }
        })

    }
}