const economy = require('../models/economy')
const { die, notify } = require('../funcs')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'dive',
    cooldown: 30,
    callback: async (message, arguments, text, client) => {
        let author_data = await economy.findOne({ id: message.author.id })
        if (!author_data) return message.channel.send("Go buy a diving mask to use this command.")
        let checking = author_data.Inventory.find(item => item.Name.toLowerCase() === 'diving mask')
        if (!checking || checking.Count < 1) return message.channel.send("Go buy a diving mask to use this command.")
        let chances = []
        for (let i = 0; i < 100; i++) {
            chances.push('fail')
        }
        for (let i = 0; i < 95; i++) {
            chances.push('win')
        }
        for (let i = 0; i < 25; i++) {
            chances.push('die')
        }
        let checkingfinal = Math.floor(Math.random() * Math.floor(chances.length))
        let final = chances[checkingfinal]
        switch (final) {
            case "win":
                let fishes = []
                for (let i = 0; i < 150; i++) {
                    fishes.push('Common fish')
                }
                for (let i = 0; i < 55; i++) {
                    fishes.push('Rare fish')
                }
                for (let i = 0; i < 1; i++) {
                    fishes.push('Octopus')
                }
                let prizes = []
                for (let i = 0; i < 150; i++) {
                    prizes.push('nothing')
                }
                for (let i = 0; i < 5; i++) {
                    prizes.push('Note')
                }
                let fish = fishes[Math.floor(Math.random() * Math.floor(fishes.length))]
                let prize = prizes[Math.floor(Math.random() * Math.floor(prizes.length))]
                let emoji = "<:rare_fish:878383125560979477>"
                let moji = ""
                if (fish === "Common fish") emoji = "<:common_fish:878382462919643176>"
                if (fish === "Octopus") emoji = "<:octopus:878378232699842590>"
                if (prize === "Note") moji = "<:emoji_14:877958079826759792>"
                await economy.findOne({ id: message.author.id }, async (err, data) => {
                    if (data) {
                        if (prize === "Note") {
                            let noting = data.Inventory.find(lol => lol.Name === "Note")
                            if (noting) {
                                await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Note" }, { $inc: { "Inventory.$.Count": 1 } })
                            } else {
                                let bobj = {
                                    Name: "Note",
                                    Count: 1
                                }
                                data.Inventory.push(bobj)
                                data.save()
                            }
                        }
                        let coking = data.Inventory.find(lol => lol.Name === fish)
                        if (coking) {
                            await economy.updateOne({ "id": message.author.id, "Inventory.Name": fish }, { $inc: { "Inventory.$.Count": 1 } })
                            return message.channel.send(
                                new MessageEmbed()
                                    .setTitle("You've dived")
                                    .setTimestamp()
                                    .setColor("GREEN")
                                    .setDescription(`You have dived and got a **${emoji} ${fish}**${prize !== "nothing" ? ` and **1 ${moji} ${prize}**` : ''}`)
                            )
                        }
                        let obj = {
                            Name: fish,
                            Count: 1
                        }
                        data.Inventory.push(obj)
                        data.save()
                        return message.channel.send(
                            new MessageEmbed()
                                .setTitle("You've dived")
                                .setTimestamp()
                                .setColor("GREEN")
                                .setDescription(`You have dived and got a **${emoji} ${fish}**${prize !== "nothing" ? ` and **1 ${moji} ${prize}**` : ''}`)
                        )
                    }
                })
                break
            case "fail":
                return message.channel.send(
                    new MessageEmbed()
                        .setColor("RED")
                        .setTitle("You've dived")
                        .setTimestamp()
                        .setDescription(`You have dived and got nothing`)
                )
                break
            case "die":
                await die(message.member, message)
                return message.channel.send(
                    new MessageEmbed()
                        .setColor("RED")
                        .setTitle("You've dived")
                        .setTimestamp()
                        .setDescription(`You died and **lost some coins**`)
                )
                break
        }
    }
}