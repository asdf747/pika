async function lucky(client, message, arguments, economy){
let prizes = []
for (let i = 0; i < 30; i++){
    prizes.push('pp')
}
for (let i = 0; i < 20; i++){
    prizes.push('unlucky')
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


    case "unlucky":
        await economy.findOne({ id: message.author.id }, async (err, data) => {
            if(data){
                let ass = data.Inventory.find(item => item.Name.toLowerCase() === 'pp')
                if(ass){
                    await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Lucky crate" }, { $inc: {"Inventory.$.Count": amount} })
                    return message.channel.send(`You opened the <:emoji_12:877912311719927839> lucky crate box and got **${amount} ${final}**`)
                }
                let obj = {
                    Name: "Luck crate",
                    Count: amount
                }
                if(!ass){

                
                data.Inventory.push(obj)
                data.save()
                return message.channel.send(`You opened the <:emoji_12:877912311719927839> lucky crate box and got **${amount} ${final}**`)
                }
            }
        })
}

await economy.updateOne({ "id": message.author.id, "Inventory.Name": "Lucky crate" }, { $inc: {"Inventory.$.Count": -1} })
}

async function unlucky(client, message, arguments, economy){
    let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
    if(!member) return message.channel.send("does this member even exist")
    const db = require('quick.db')
    db.set(`unlucky_${message.author.id}`, new Date())
    return message.channel.send(`You used the unlucky cookie on ${member.user.username} now he can't rob or join heists for 15 minutes`)
}

module.exports = {
    lucky,
    unlucky
}