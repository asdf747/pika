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
let validgos = 0
let duration = ms(arguments[1])
if(!duration) return message.channel.send("Please enter a valid duration")
let reason = `Banned by ${message.author.tag}`
if(arguments[2]) reason = arguments.slice(2).join(' ')
users.forEach(async user => {
    let bob = true
    
    message.guild.members.ban(user, { reason })
    .then(use => {
        if(use.tag !== undefined){
            validusers = true
            validgos++
        }

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
if(!validusers) return message.channel.send("Invalid user.")
message.channel.send(`Banned **${validusers.length}** user${validusers.length !== 1 ? 's' : ''} ${moment(new Date(Date.now() + duration)).fromNow().replace('in', 'for')}`)


    }
}