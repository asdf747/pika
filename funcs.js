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
    return `${moment.duration(duration).get('years') !== 0 ? `${moment.duration(duration).get('years')} year${moment.duration(duration).get('years') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('months') !== 0 ? `${moment.duration(duration).get('months')} month${moment.duration(duration).get('months') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('day') !== 0 ? `${moment.duration(duration).get('days')} day${moment.duration(duration).get('days') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('hours') !== 0 ? `${moment.duration(duration).get('hours')} hour${moment.duration(duration).get('hours') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('minutes') !== 0 ? `${moment.duration(duration).get('minutes')} minute${moment.duration(duration).get('minutes') !== 1 ? 's' : ''} ` : ''}${moment.duration(duration).get('seconds') >= 0 ? `${moment.duration(duration).get('seconds')} second${moment.duration(duration).get('seconds') !== 1 ? 's' : ''}` : ''}`
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
            }).save().then(async array => {
                schedule.scheduleJob(new Date(Date.now() + duration), async function(){
                    let gel = await temprole.findOne({ _id: array._id })
                    if(gel){
                        mem.roles.remove(rol, 'Delayed role')
                        array.delete()
                    }
                })
            })
        }if(!data){
            await new temprole({
                Guild: guild.id,
                User: member.id,
                Role: rol.id,
                Start: new Date(),
                End: new Date(Date.now() + duration)
            }).save().then(async array => {
                schedule.scheduleJob(new Date(Date.now() + duration), async function(){
                    let gel = await temprole.findOne({ _id: array._id })
                    if(gel){
                        mem.roles.remove(rol, 'Delayed role')
                        array.delete()
                    }
                    
                })
            })
        }
    })
    
}

async function getRole(guild, message, arguments, number){
    let role = guild.roles.cache.get(arguments[number])
    if(isNaN(role)) role = guild.roles.cache.find(r => r.name.toLowerCase().includes(arguments.slice(number).join(' ').toLowerCase()))
    if(arguments[number].startsWith('<@&') && arguments[number].endsWith('>')){
        nomnom = arguments[number].replace('<@&','').replace('>','')
        role = guild.roles.cache.get(nomnom)
    }
    if(!role) role = undefined
    return role
}

async function embedPages(client, message, array, options) {
    if (!typeof options === 'object') return console.log("Options must be an array")
    const { MessageEmbed } = require('discord.js')
    let footer = options.footer || ''
    title = options.title || ''
    footerImage = options.footerImage || null
    color = options.color || null
    perPage = options.perPage || 5
    thumbnail = options.thumbnail || null
    header = options.header || ''
    fields = options.fields || []
    joinBy = options.joinBy || '\n'
    image = options.image || null
    author = options.author || ''
    authorImage = options.authorImage || null
    args = options.args || false
    timestamp = options.timestamp || false
    user = options.user || message.author
    emojis = options.emojis || {
        first_track: '⏮️',
        previous_track: '◀',
        next_track: '▶',
        last_track: '⏭️',
        delete: '🗑',
        jump_to: '↗️'
    }

    let page = parseInt(args) ? args : 1;
    parseInt(args) <= Math.ceil(array.length / perPage) ? page : page = 1;

    let first = !isNaN(parseInt(args)) && !args.includes('.') ? perPage * (parseInt(page) - 1) : 0;
    let second = !isNaN(parseInt(args)) && !args.includes('.') ? perPage * parseInt(page) : perPage;
    let embed = new MessageEmbed()
        .setTitle(title)
        .setFooter(`${footer.length ? `${footer} |` : ''} Page: ${page}/${Math.ceil(array.length / perPage)}`, footerImage)
        .setColor(color)
        .setThumbnail(thumbnail)
        .addFields(fields)
        .setDescription(`${header ? `${header}\n` : ""}${array.slice(first, second).join(joinBy)}`)
        .setAuthor(author, authorImage)

    if(timestamp) embed.setTimestamp()
    let msg = await message.channel.send(embed)
    if(array.length > perPage){
    if(args === false){
    await msg.react(emojis.first_track)
    await msg.react(emojis.previous_track)
    if (args === false && Math.ceil(array.length / perPage) > 3) await msg.react(emojis.jump_to)
    await msg.react(emojis.next_track)
    await msg.react(emojis.last_track)
    await msg.react(emojis.delete)

    const collector = msg.createReactionCollector((reaction, member) => member.id === user.id, {
        time: 120000
    });

    collector.on('collect', async r => {
        collector.resetTimer()
        const reactionadd = array.slice(first + perPage, second + perPage).length;
        const reactionremove = array.slice(first - perPage, second - perPage).length;
        if (r.emoji.toString() === emojis.next_track && reactionadd !== 0) {
            page++
            r.users.remove(message.author.id);

            first += perPage;
            second += perPage;
            embed.setDescription(`${header ? `${header}\n` : ""}${array.slice(first, second).join(joinBy)}`);
            embed.setFooter(`${footer.length ? `${footer} |` : ''} Page: ${page}/${Math.ceil(array.length / perPage)}`, footerImage);
            msg.edit(embed)
        } else if (r.emoji.toString() === emojis.previous_track && reactionremove !== 0) {
            r.users.remove(message.author.id);
            page--
            first -= perPage;
            second -= perPage;
            embed.setDescription(`${header ? `${header}\n` : ""}${array.slice(first, second).join(joinBy)}`);
            embed.setFooter(`${footer.length ? `${footer} |` : ''} Page: ${page}/${Math.ceil(array.length / perPage)}`, footerImage);
            msg.edit(embed)
        } else if (r.emoji.toString() === emojis.first_track) {
            r.users.remove(message.author.id);
            page = 1;
            first = 0;
            second = perPage;
            embed.setDescription(`${header ? `${header}\n` : ""}${array.slice(first, second).join(joinBy)}`);
            embed.setFooter(`${footer.length ? `${footer} |` : ''} Page: ${page}/${Math.ceil(array.length / perPage)}`, footerImage);
            msg.edit(embed)
        } else if (r.emoji.toString() === emojis.last_track) {
            r.users.remove(message.author.id);
            page = Math.ceil(array.length / perPage);
            first = (page * perPage) - perPage;
            second = page * perPage;
            embed.setDescription(`${header ? `${header}\n` : ""}${array.slice(first, second).join(joinBy)}`);
            embed.setFooter(`${footer.length ? `${footer} |` : ''} Page: ${page}/${Math.ceil(array.length / perPage)}`, footerImage);
            msg.edit(embed)
        } else if (r.emoji.toString() === emojis.delete) {
            msg.reactions.removeAll();
        } else if (r.emoji.toString() === emojis.jump_to) {
            if (args === false && Math.ceil(array.length / perPage) > 3) {
                r.users.remove(message.author.id)
                let mesg = await message.channel.send(`${message.author.toString()} Enter a page number`)
                let coll = await message.channel.awaitMessages(x => x.author.id === message.author.id, { time: 10000, max: 1 })
                if (!coll.size) mesg.delete()
                if (Number(coll.first().content) && !coll.first().content.includes('.') && Math.ceil(array.length / perPage) >= Number(coll.first().content)) {
                    mesg.delete()
                    page = Number(coll.first().content)
                    first = perPage * (parseInt(page) - 1)
                    second = perPage * parseInt(page)
                    embed.setDescription(`${header ? `${header}\n` : ""}${array.slice(first, second).join(joinBy)}`);
                    embed.setFooter(`${footer.length ? `${footer} |` : ''} Page: ${page}/${Math.ceil(array.length / perPage)}`, footerImage);
                    msg.edit(embed)
                    coll.first().delete()
                }else {
                    mesg.delete()
                    coll.first().delete()
                }
            }
        }
    })
    collector.on('end', (_, reason) => {
        if (reason === "time") msg.reactions.removeAll();
    })
}
}
}

module.exports = {
    die,
    tempban,
    notify,
    set,
    fetch,
    durationString,
    add,
    temprole,
    getRole,
    embedPages
}