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
let validusers = false
let validgos = 0
let duration = ms(arguments[1])
if(!duration) return message.channel.send("Please enter a valid duration")
let reason = `Banned by ${message.author.tag}`
let higher = false

let higherbot = false
users.forEach(user => {
    const us = message.guild.members.cache.get(user)
    if(us && us.roles.highest.position >= message.guild.me.roles.highest.position) higherbot = true
    if(us && us.roles.highest.position >= message.member.roles.highest.position) higher = true
})
if(higher) return message.channel.send(":x: This user is higher than you")
if(higherbot) return message.channel.send(":x: This user is higher than me")
if(arguments[2]) reason = arguments.slice(2).join(' ')
users.forEach(async user => {
    let bob = true
    
    message.guild.members.ban(user, { reason })
    .then(use => {
        if(use.tag !== undefined){
            validusers = true
            validgos++
        }
        if(users.length === 1) message.channel.send(`Banned **${use.tag}** ${moment(new Date(Date.now() + duration)).fromNow().replace('in', 'for')}`)

    }).catch(async () => {bob = false})
    if(bob) {
    await new TEMP({
        Guild: message.guild.id,
        User: user,
        Start: new Date(),
        End: new Date(Date.now() + duration),
        Reason: reason
    }).save().then(async thingo => {
        schedule.scheduleJob(new Date(Date.now() + duration), function(){
            message.guild.members.unban(user, 'Automatic unban from tempban')
            thingo.delete()
        })
    })
}
})
if(users.length > 1) message.channel.send(`Banned **${users.length}** user${users.length !== 1 ? 's' : ''} ${moment(new Date(Date.now() + duration)).fromNow().replace('in', 'for')}`)


    }
}