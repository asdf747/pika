async function die(member, message){
    if(!message.guild.members.cache.get(member.id)) return console.log("This member doesn't exist")
    let economy = require('./models/economy')
    await economy.findOne({ id: member.id }, async(err, data) => {
        if(data){
            if(data.Wallet > 0){
                let amount = Math.floor(Math.random() * data.Wallet / 2) + 1
                await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: -amount} })
            }
        }if(!data){
            await new economy({
                id: member.id,
                Wallet: 500,
                Bank: 100,
                InBank: 0
            }).save().then(async (a) => {
                if(a.Wallet > 0){
                    let amount = Math.floor(Math.random() * a.Wallet / 2) + 1
                    await economy.findOneAndUpdate({ id: member.id }, { $inc: {Wallet: -amount} })
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

module.exports = {
    die,
    tempban
}