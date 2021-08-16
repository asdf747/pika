const TEMP = require('../models/tempban')
const schedule = require('node-schedule')
const ms = require('ms')
const moment = require('moment')

module.exports = {
    commands: 'tempban',
    minArgs: 2,
    permissions: "BAN_MEMBERS",
    expectedArgs: '<user(s)> <duration> [reason]',
    callback: async (message, arguments, text, client) => {
        const users = arguments[0].split(',')
        let validusers = []
        let validuserstag = []
        let gos = ''
        let duration = ms(arguments[1])
        if(!duration) return message.channel.send(":x: Please enter a valid duration")
        let reason = `Banned by ${message.author.tag}`
        let high = false
        let highbot = false
        if(arguments[2]) reason = arguments.slice(2).join(' ')
        users.forEach(user => {
                validusers.push(user)
            
        })
        if(!validusers.length) return message.channel.send(`:x: Invalid user${users.length !== 1 ? 's' : ''}`)
        validusers.forEach(user => {
            if(message.guild.members.cache.get(user)){
                if(message.guild.members.cache.get(user).roles.highest.position >= message.member.roles.highest.position || user === message.guild.ownerID) high = true
            }
        })
        validusers.forEach(user => {
            if(message.guild.members.cache.get(user)){
                if(message.guild.members.cache.get(user).roles.highest.position >= message.guild.me.roles.highest.position || user === message.guild.ownerID) highbot = true
            }
        })
        if(high) return message.channel.send("This user is higher than you.")
        if(highbot) return message.channel.send("This user is higher than me")
        let yos = []
        validusers.forEach(async user => {
            los = true
            message.guild.members.ban(user, { reason }).then(es => {
                if(!es.id) return los = false
                    
            
                validuserstag.push(es.tag)
            }).catch(() => yos.push('false'))
            if(!los) return
            await new TEMP({
                Guild: message.guild.id,
                User: user,
                Start: new Date(Date.now()),
                Reason: reason,
                End: new Date(Date.now() + duration),
            }).save().then(async thingo => {
                schedule.scheduleJob(new Date(Date.now() + duration), async function(){
                    message.guild.members.unban(user, 'Automatic unban from tempban')
                    thingo.delete()
                })
            })
        })
        if(validuserstag[0] === undefined) return message.channel.send("Invalid user.")
        if(validuserstag[0] !== undefined && !yos.includes('false') && validusers.length === 1) return message.channel.send(`Banned **${validuserstag[0]}** ${moment(new Date(Date.now() + duration)).fromNow().replace('in', 'for')}`)
        if(validuserstag[0] !== undefined && !yos.includes('false') && validusers.length > 1) return message.channel.send(`Banned **${validusers.length}** users ${moment(new Date(Date.now() + duration)).fromNow().replace('in', 'for')}`)


    }
}