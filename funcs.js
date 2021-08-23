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
    let Types = ['Death', 'Share', 'Gift', 'Text']
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

async function set(client, key, value){
    let modl = require('./models/jsons')
    await modl.findOne({ ID: key }, async (err, data) => {
        if(data){
            await modl.findOneAndUpdate({ ID: key }, { $set: {Data: value} })
        }
        if(!data){
            await new modl({
                ID: key,
                Data: value
            }).save()
        }
    })
}

async function fetch(client, key){
    const utils = require('utils-discord')
    let modl = require('./models/jsons')
    let gas = await modl.findOne({ ID: key })
    if(!gas) return undefined
    return gas.Data
}

async function durationString(duration){
    const moment = require('moment')
    return `${moment.duration(duration).get('years') !== 0 ? `${moment.duration(duration).get('years')} year${moment.duration(duration).get('years') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('months') !== 0 ? `${moment.duration(duration).get('months')} month${moment.duration(duration).get('months') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('day') !== 0 ? `${moment.duration(duration).get('days')} day${moment.duration(duration).get('days') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('hours') !== 0 ? `${moment.duration(duration).get('hours')} hour${moment.duration(duration).get('hours') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('minutes') !== 0 ? `${moment.duration(duration).get('minutes')} minute${moment.duration(duration).get('minutes') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('seconds') !== 0 ? `${moment.duration(duration).get('seconds')} second${moment.duration(duration).get('seconds') !== 1 ? 's' : ''}` : ''}`
}

async function add(key, value){
    let modl = require('./models/jsons')
    await modl.findOne({ ID: key }, async(err, data) => {
        if(data){
            let no = data.Data + value
            await modl.findOneAndUpdate({ ID: key }, { $inc: {Data: no} })
        }
        if(!data){
            await new modl({
                ID: key,
                Data: value
            }).save()
        }
    })
}

async function temprole(guild, member, role, duration){
    const temprole = require('./models/temprole')
    const schedule = require('node-schedule')
    // checking if role exists
    const rol = guild.roles.cache.get(role.id)
    if(!rol) return console.log("Invalid role")
    // checking if member exists
    const mem = guild.members.cache.get(member.id)
    if(!mem) return console.log("Invalid member")
    if(isNaN(duration) || duration < 1) return console.log("Duration can't be less than 1 second")
    // adding the role to the member
    mem.roles.add(rol)
    // creating a new database
    await temprole.findOne({ Guild: guild.id, User: member.id, Role: rol.id }, async (err, data) => {
        if(data){
            data.delete()
            await new temprole({
                Guild: guild.id,
                User: member.id,
                Role: rol.id,
                Start: new Date(),
                End: new Date(Date.now() + duration)
            }).save().then(array => {
                schedule.scheduleJob(new Date(Date.now() + duration), function(){
                    mem.roles.remove(rol, 'Delayed role')
                    array.delete()
                })
            })
        }if(!data){
            await new temprole({
                Guild: guild.id,
                User: member.id,
                Role: rol.id,
                Start: new Date(),
                End: new Date(Date.now() + duration)
            }).save().then(array => {
                schedule.scheduleJob(new Date(Date.now() + duration), function(){
                    mem.roles.remove(rol, 'Delayed role')
                    array.delete()
                })
            })
        }
    })
    
}

module.exports = {
    die,
    tempban,
    notify,
    set,
    fetch,
    durationString,
    add,
    temprole
}