const { MessageEmbed } = require('discord.js')
const economy = require('../models/economy')
const moment = require('moment')
const db = require('../funcs')

module.exports = {
    commands: 'work',
    description: "Work to gain money.",
    cooldown: 18000,
    callback: async(message, arguments, text, client) => {
        let bonus = await db.fetch(client, `bonus_work_${message.author.id}`)
        if(!bonus) await db.set(client, `bonus_work_${message.author.id}`, 1)
        let lastwork = await db.fetch(`last_work_${message.author.id}`)
        if(bonus !== null && moment.duration(Date.now() - lastwork).as('days') < 2) await db.add(client, `bonus_work_${message.author.id}`, 1)
        if(bonus !== null && moment.duration(Date.now() - lastwork).as('days') >= 2) await db.set(client, `bonus_work_${message.author.id}`, 1)
        
        bonus = await db.fetch(client, `bonus_work_${message.author.id}`)
        let amount = Math.floor(Math.random() * 15000) + 1 * bonus
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                db.set(client, `last_work_${message.author.id}`, Date.now())
                return message.channel.send(
                    new MessageEmbed()
                    .setTitle("You've worked")
                    .setColor("BLUE")
                    .setTimestamp()
                    .setDescription(`You've worked and got **${parseInt(amount).toLocaleString("en-US")}**\n${bonus !== 1 ? `Bonus: **${bonus.toLocaleString("en-Us")}**` : ''}`)
                )
                
            }if(!data){
                await new economy({
                    id: message.author.id,
                    Wallet: 500,
                    Bank: 100,
                    InBank: 0
                }).save().then(async () => {
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                    db.set(client, `last_work_${message.author.id}`, Date.now())
                return message.channel.send(
                    new MessageEmbed()
                    .setTitle("You've worked")
                    .setColor("BLUE")
                    .setTimestamp()
                    .setDescription(`You've worked and got **${parseInt(amount).toLocaleString("en-US")}**\n${bonus !== 1 ? `Bonus: **${bonus.toLocaleString("en-Us")}**` : ''}`)
                )
                })
            }
        })
    }
}