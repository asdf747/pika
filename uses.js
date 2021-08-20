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
    let member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0])
    if(!member) return message.channel.send("mention a member bruh")
    if(member.id === message.author.id) return message.channel.send("why would you do this to yourself")
    const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://lol:fofo29112007@golgo.t3bmd.mongodb.net/gg?retryWrites=true&w=majority");
    await db.set(`unlucky_${member.id}`, Date.now())
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

module.exports = {
    lucky,
    unlucky,
    note
}