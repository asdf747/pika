     async function lucky(client, message, arguments, economy){
let prizes = []
for (let i = 0; i < 30; i++){
    prizes.push('pp')
}
for (let i = 0; i < 20; i++){
    prizes.push('unlucky')
}
for (let i = 0; i < 5; i++){
    prizes.push('note')
}
let checkingprize = Math.floor(Math.random() * Math.floor(prizes.length)) 
let final = prizes[checkingprize]
let amount = Math.floor(Math.random() * 10) + 1
switch(final){
    case "pp":
        await economy.findOne({ id: message.author.id }, async (err, data) => {
            if(data){
                let ass = data.Inventory.find(item => item.Name.toLowerCase() === 'pp')
                if(ass){
                    await economy.updateOne({ "id": message.author.id, "Inventory.Name": "PP" }, { $inc: {"Inventory.$.Count": amount} })
                    return message.channel.send(`You opened the <:emoji_12:877912311719927839> lucky crate box and got **${amount} ${final}**`)
                }
                let obj = {
                    Name: "PP",
                    Count: amount
                }
                if(!ass){

                
                data.Inventory.push(obj)
                data.save()
                return message.channel.send(`You opened the <:emoji_12:877912311719927839> lucky crate box and got **${amount} ${final}**`)
                }
            }
        })
        break


    case "unlucky":
        await economy.findOne({ id: message.author.id }, async (err, data) => {
            if(data){
                let ass = data.Inventory.find(item => item.Name.toLowerCase() === 'unlucky cookie')
                if(ass){
                    await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Unlucky cookie" }, { $inc: {"Inventory.$.Count": amount} })
                    return message.channel.send(`You opened the <:emoji_12:877912311719927839> lucky crate box and got **${amount} ${final}**`)
                }else{

                
                let obj = {
                    Name: "Unlucky cookie",
                    Count: amount
                }

                
                data.Inventory.push(obj)
                data.save()
                return message.channel.send(`You opened the <:emoji_12:877912311719927839> lucky crate box and got **${amount} ${final}**`)
                }
            }
        })
        break

    case "note":
        await economy.findOne({ id: message.author.id }, async (err, data) => {
            if(data){
                let ass = data.Inventory.find(item => item.Name.toLowerCase() === 'note')
                if(ass){
                    await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Note" }, { $inc: {"Inventory.$.Count": amount} })
                    return message.channel.send(`You opened the <:emoji_12:877912311719927839> lucky crate box and got **${amount} ${final}**`)
                }else{
                    let obj = {
                        Name: "Note",
                        Count: amount
                    }
                    data.Inventory.push(obj)
                    data.save()
                    return message.channel.send(`You opened the <:emoji_12:877912311719927839> lucky crate box and got **${amount} ${final}**`)
                }
            }
        })
        break
}

await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Lucky crate" }, { $inc: {"Inventory.$.Count": -1} })
return
}

    async function unlucky(client, message, arguments, economy){
const db = require('./funcs')
    let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
    if(!member) return message.channel.send("mention a member bruh")
    const moment = require('moment')
    const lol = await db.fetch(client, `unlucky_${member.id}`)
    if(lol !== null && moment.duration(Date.now() - lol).as("minutes") < 15) return message.channel.send("someone already used the unlucky cookie on this person")
    if(member.id === message.author.id) return message.channel.send("why would you do this to yourself")
    await db.set(client, `unlucky_${member.id}`, Date.now())
    await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Unlucky cookie" }, { $inc: {"Inventory.$.Count": -1} })
    return message.channel.send(`You used the unlucky cookie on ${member.user.username} now he can't rob or join heists for 15 minutes`)
}

async function note(client, message, arguments, economy){
    let amount = Math.floor(Math.random() * 50000) + 1
    await economy.findOneAndUpdate({ id: message.author.id }, { $inc: {Bank: parseInt(amount)} })
    await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Note" }, { $inc: {"Inventory.$.Count": -1} })
    let cock = await economy.findOne({ id: message.author.id })
 
    return message.channel.send(`You used your note and got **${parseInt(amount).toLocaleString("en-US")} bank space**, Current bank space is **${parseInt(cock.Bank + amount).toLocaleString("en-US")}**`)
}


async function bomb(client, message, arguments, economy){
    const { MessageEmbed } = require('discord.js')
    await message.channel.send(`${message.author.username} dropped a coin bomb say \`collect\` to join`)
    const filter = x => x.content.toLowerCase() === 'collect' && x.author.id !== message.author.id
    const collect = await message.channel.createMessageCollector(filter, { time: 15000 })
    let joined = []
    collect.on('collect', async m => {
        if(joined.length >= 10) collect.end()
        if(joined.includes(m.author.id)) return
        joined.push(m.author.id)
    })
    collect.on('end', async msgs => {
        let reply = []
        if(joined.length){
        for (let i = 0; i < joined.length; i++){
            await economy.findOne({ id: joined[i] }, async(err, data) => {
                if(data){
                    await economy.findOneAndUpdate({ id: joined[i] }, { $inc: {Wallet: 5000 / joined.length} })
                }if(!data){
                    await new economy({
                        id: joined[i],
                        Wallet: 500,
                        Bank: 100,
                        InBank: 0
                    }).save().then(async () => {
                        await economy.findOneAndUpdate({ id: joined[i] }, { $inc: {Wallet: 5000 / joined.length} })
                    })
                }
            })
            reply.push(`**+ ${client.users.cache.get(joined[i]).tag}**\n*got ${parseInt(5000 / joined.length).toLocaleString("en-US")}*\n`)
        }
    }

    message.channel.send(
        new MessageEmbed()
        .setTitle('Bomb results')
        .setDescription(reply.map(a => a).join('\n'))
        .setTimestamp()
        .setColor("GREEN")
        .setThumbnail(message.guild.iconURL() || null)
    )
        await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Coin bomb" }, { $inc: {"Inventory.$.Count": -1} })
    })
}

async function cell(client, message, arguments, economy){
    const { notify } = require('./funcs')
    const utils = require('utils-discord')
    const msg = await message.channel.send("**Options:**\n`a`: Notifications\n`b`: Text someone\n`e`: Exit")
    const collcot = await message.channel.awaitMessages(x => x.author.id === message.author.id, { time: 7000, max: 1 })
    if(!collcot.size && msg) msg.delete()
    let choices = ['a', 'b', 'e']
    let choice = collcot.first().content.toLowerCase()
    if(!choices.includes(choice)) return message.channel.send("This isn't even an option")
    switch(choice){
        case "a":
            let notifs = await economy.findOne({ id: message.author.id })
        if(!notifs || !notifs.Notifications.length) return message.channel.send("You don't have any notifications yet")
        const notifs_array = notifs.Notifications.reverse().map((notify, i) => `** ${i+1}. ${notify.Type}**\n*${notify.Description}*`)

        let options = {
            perpage: 6,
            title: `${message.author.tag}'s notifications`,
            joinBy: "\n\n",
            color: "BLUE",
            footer: ' ',
            footerImage: ' ',
            timestamp: true
        }

        utils.createEmbedPages(client, message, notifs_array, options)
        msg.delete()
        break
        case "e":
            return message.channel.send('Exiting phone')
            break
        case "b":
            await message.channel.send('Who do you want to text')
            let mem = await message.channel.awaitMessages(x => x.author.id === message.author.id, { time: 7000, max: 1 })
            if(!mem.size) return message.channel.send("I guess you don't want to text someone today")
            let membor = mem.first().content
            let member = mem.first().mentions.members.first() || message.guild.members.cache.get(membor)
            if(!member) return message.channel.send("Does this member even exist in this server")
            await message.channel.send("What do you want to text him")
            let tex = await message.channel.awaitMessages(x => x.author.id === message.author.id, { time: 7000, max: 1 })
            if(!tex.size) return message.channel.send("I guess you don't want to text someone today")
            let text = tex.first().content
            await notify(member, "Text", `${message.author.tag} texted you ${text}`)
            message.channel.send(`Sent your message to ${member.user.username}`)
            break
    }
    
}


module.exports = {
    lucky,
    unlucky,
    note,
    bomb,
    cell
}