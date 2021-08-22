async function die(member, message){
    if(!message.guild.members.cache.get(member.id)) return console.log("This member doesn't exist")
    let economy = require('./models/economy')
    await economy.findOne({ id: member.id }, async(err, data) => {
        if(data){
            if(data.Wallet > 0){
                let amount = Math.floor(Math.random() * data.Wallet / 6) + 1
                await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: -amount} })
                await notify(member, "Death", `You died and lost **${amount.toLocaleString("en-US")} coins**`)
            }
        }if(!data){
            await new economy({
                id: member.id,
                Wallet: 500,
                Bank: 100,
                InBank: 0
            }).save().then(async (a) => {
                if(a.Wallet > 0){
                    let amount = Math.floor(Math.random() * a.Wallet / 6) + 1
                    await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: -amount} })
                    await notify(member, "Death", `You died and lost **${amount.toLocaleString("en-US")} coins**`)
                }
            })
        }
    })
    
}

async function tempban(member, guild, duration, reason){
    const TEMP = require('./models/tempban')
    const schedule = require('node-schedule')
    guild.members.ban(member.id, { reason })
    await new TEMP({
        Guild: guild.id,
        User: member.id,
        Start: new Date(),
        End: new Date(Date.now() + duration),
        Reason: reason
    }).save().then(async thingo => {
        schedule.scheduleJob(new Date(Date.now() + duration), function(){
            guild.members.unban(member.id, 'Automatic unban from tempban')
            thingo.delete()
        })
    })
}

async function notify(member, Type, Description){
    let Types = ['Death', 'Share', 'Gift']
    let max_notifs_pages = 15
    if(!Types.includes(Type)) return console.log("Invalid notification type.")
    const economy = require('./models/economy')
    await economy.findOne({ id: member.id }, async (err, data) => {
        if(data){
            if(data.Notifications.length >= 6 * max_notifs_pages){
                data.splice(0, 1)
                data.save()
            }
            let obj = {
                Type,
                Description
            }
            data.Notifications.push(obj)
            data.save()
        }if(!data){
            await new economy({
                id: member.id,
                Wallet: 500,
                Bank: 100,
                InBank: 0,
                Notifications: [
                    {
                        Type,
                        Description
                    }
                ]
            }).save()
        }
    })
}

async function set(key, value){
    let modl = require('./models/jsons')
    await modl.findOne({ ID: key }, async (err, data) => {
        if(data){
            await modl.updateOne({ "ID": key }, { $set: {Data: value} })
        }
        if(!data){
            await new modl({
                ID: key,
                Data: value
            }).save()
        }
    })
}

async function fetch(key){
    let modl = require('./models/jsons')
    let cock = await modl.findOne({ ID: key })
    if(!cock) return null
    if(cock) return cock.Data
}

module.exports = {
    die,
    tempban,
    notify,
    set
}