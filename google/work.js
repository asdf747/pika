const { MessageEmbed } = require('discord.js')
const economy = require('../models/economy')
const moment = require('moment')
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://lol:fofo29112007@golgo.t3bmd.mongodb.net/gg?retryWrites=true&w=majority");

module.exports = {
    commands: 'work',
    description: "Work to gain money.",
    cooldown: 3600,
    callback: async(message, arguments, text, client) => {
        let bonus = await db.fetch(`bonus_work_${message.author.id}`)
        if(!bonus) await db.set(`bonus_work_${message.author.id}`)
        let lastwork = await db.fetch(`last_work_${message.author.id}`)
        if(bonus !== null && moment.duration(Date.now() - lastwork).as('days') < 2) await db.add(`bonus_work_${message.author.id}`, 1)
        if(bonus !== null && moment.duration(Date.now() - lastwork).as('days') >= 2) await db.set(`bonus_work_${message.author.id}`, 1)
        
        if(!bonus) bonus = 1
        let amount = Math.floor(Math.random() * 10000) + 1 * bonus
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                db.set(`last_work_${message.author.id}`, Date.now())
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
                    db.set(`last_work_${message.author.id}`, Date.now())
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