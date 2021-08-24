const { MessageEmbed } = require('discord.js')
const economy = require('../models/economy')
const moment = require('moment')
const db = require('../funcs')

module.exports = {
    commands: 'work',
    description: "Work to gain money.",
    cooldown: 7200,
    callback: async(message, arguments, text, client) => {
        let bonus = await db.fetch(client, `bonus_work_${message.author.id}`)
        if(!bonus) await db.set(client, `bonus_work_${message.author.id}`, 1)
        let lastwork = await db.fetch(`last_work_${message.author.id}`)
        if(bonus !== null && moment.duration(Date.now() - lastwork).as('days') < 2) await db.add(client, `bonus_work_${message.author.id}`, 1)
        if(bonus !== null && moment.duration(Date.now() - lastwork).as('days') >= 2) await db.set(client, `bonus_work_${message.author.id}`, 1)
        
        bonus = await db.fetch(client, `bonus_work_${message.author.id}`)
        let amount = Math.floor(Math.random() * 15000) + 1 * bonus
        let prizes = []
        let emoji = ''
        for (let i = 0; i < 100; i++){
            prizes.push('nothing')
        }
        for (let i = 0; i < 30; i++){
            prizes.push('PP')
        }
        for (let i = 0; i < 10; i++){
            prizes.push('Lucky crate')
        }
        let prize = prizes[Math.floor(Math.random() * Math.floor(prizes.length))]
        let count = Math.floor(Math.random() * 2) + 1
        if(prize === 'Lucky crate') emoji = '<:emoji_12:877912311719927839>'
        if(prize === 'PP') emoji = '<:penis:877589942140813333>'
        await economy.findOne({ id: message.author.id }, async(err, data) => {
            if(data){
                await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                switch(prize){
                    case "PP":
                        if(data.Inventory.find(tem => tem.Name === 'PP') && data.Inventory.find(tem => tem.Name === 'PP').Count >= 1){
                            await economy.updateOne({ "id": message.author.id, "Inventory.Name": "PP" }, { $inc: {"Inventory.$.Count": count} })
                        }else{
                            let obj = {
                                Name: "PP",
                                Count: count
                            }
                            data.Inventory.push(obj)
                            data.save()
                        }
                        break
                    case "Lucky crate":
                        if(data.Inventory.find(tem => tem.Name === 'Lucky crate') && data.Inventory.find(tem => tem.Name === 'Lucky crate').Count >= 1){
                            await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Lucky crate" }, { $inc: {"Inventory.$.Count": count} })
                        }else{
                            let ob = {
                                Name: "Lucky crate",
                                Count: count
                            }
                            data.Inventory.push(ob)
                            data.save()
                        }
                        break
                }
                await db.set(client, `last_work_${message.author.id}`, Date.now())
                return message.channel.send(
                    new MessageEmbed()
                    .setTitle("You've worked")
                    .setColor("BLUE")
                    .setTimestamp()
                    .setDescription(`You've worked and got **${parseInt(amount).toLocaleString("en-US")}**${prize !== 'nothing' ? ` and ${count} ${prize}${count !== 1 ? 's': ''}` : ''}\n${bonus !== 1 ? `Bonus: **${bonus.toLocaleString("en-US")}**` : ''}`)
                )
                
            }if(!data){
                await new economy({
                    id: message.author.id,
                    Wallet: 500,
                    Bank: 100,
                    InBank: 0
                }).save().then(async () => {
                    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Wallet: amount} })
                    switch(prize){
                        case "PP":
                            if(data.Inventory.find(tem => tem.Name === 'PP') && data.Inventory.find(tem => tem.Name === 'PP').Count >= 1){
                                await economy.updateOne({ "id": message.author.id, "Inventory.Name": "PP" }, { $inc: {"Inventory.$.Count": count} })
                            }else{
                                let obj = {
                                    Name: "PP",
                                    Count: count
                                }
                                data.Inventory.push(obj)
                                data.save()
                            }
                            break
                        case "Lucky crate":
                            if(data.Inventory.find(tem => tem.Name === 'Lucky crate') && data.Inventory.find(tem => tem.Name === 'Lucky crate').Count >= 1){
                                await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Lucky crate" }, { $inc: {"Inventory.$.Count": count} })
                            }else{
                                let ob = {
                                    Name: "Lucky crate",
                                    Count: count
                                }
                                data.Inventory.push(ob)
                                data.save()
                            }
                            break
                    }
                    await db.set(client, `last_work_${message.author.id}`, Date.now())
                return message.channel.send(
                    new MessageEmbed()
                    .setTitle("You've worked")
                    .setColor("BLUE")
                    .setTimestamp()
                    .setDescription(`You've worked and got **${parseInt(amount).toLocaleString("en-US")}**${prize !== 'nothing' ? ` and ${count} ${prize}${count !== 1 ? 's': ''}` : ''}\n${bonus !== 1 ? `Bonus: **${bonus.toLocaleString("en-US")}**` : ''}`)
                )
                })
            }
        })
    }
}