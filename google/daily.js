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
                if(data.Inventory.find(item => item.Name.toLowerCase() === 'lucky box') && data.Inventory.find(item => item.Name.toLowerCase() === 'lucky crate').Count >= 1){
                    await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Lucky crate" }, { $inc: {"Inventory.$.Count": 1} })
                }else {
                    let obj = {
                        Name: "Lucky crate",
                        Count: 1
                    }
                    data.Inventory.push(obj)
                    data.save()
                }
                
                message.channel.send(
                    new MessageEmbed()
                    .setTitle("Claimed daily")
                    .setDescription(`You've claimed your daily and got **${amount.toLocaleString("en-US")}** and **1 <:emoji_12:877912311719927839> Lucky crate**`)
                    .setFooter(`Streak: ${bonus / 2000} (+${bonus})`)
                    .setColor("BLUE")
                )
                await db.set(client, `last_daily_${message.author.id}`, Date.now())

            }if(!data){
                await new economy({
                    id: message.author.id,
                    Wallet: 500,
                    Bank: 100,
                    InBank: 0,
                    Inventory: [
                        {
                            Name: "Lucky box",
                            Count: 1
                        }
                    ]
                }).save().then(async () => {
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                    
                    message.channel.send(
                        new MessageEmbed()
                        .setTitle("Claimed daily")
                        .setDescription(`You've claimed your daily and got **${amount.toLocaleString("en-US")}** and **1 <:emoji_12:877912311719927839> Lucky crate**`)
                        .setFooter(`Streak: ${bonus / 2000} (+${bonus})`)
                        .setColor("BLUE")
                    )
                    await db.set(client, `last_daily_${message.author.id}`, Date.now())
                })
            }
        })

    }
}