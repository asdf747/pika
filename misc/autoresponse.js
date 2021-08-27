const AR = require('../models/autoresponse')
const Pagination = require('discord-paginationembed')
const { embedPages } = require('../funcs')

module.exports = {
    commands: ['autoresponse', 'ar'],
    permissions: "BAN_MEMBERS",
    minArgs: 1,
    expectedArgs: 'add <trigger> <response>',
    subCommands: 'remove',
    callback: async (message, arguments, text, client) => {
        if (!arguments[0]) {
            await AR.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (data) {
                    if (!data.Ars.length) return message.channel.send("There isn't any autoresponses added.")
                    const ars = data.Ars.map((gas, i) => `**${i + 1}.** "${gas.Trigger}"`)

                    let options = {
                        perPage: 15,
                        title: `Autoresponses for ${message.guild.name}`,
                        color: message.member.displayColor
                    }
                    embedPages(client, message, ars, options)
                } if (!data) {
                    message.channel.send("There isn't any autoresponse added.")
                }
            })
            return
        }
        if (arguments[0]) {
            if (arguments[0].toLowerCase() === 'add') {
                var matcho = /"(.*?)"/g
                var matcho2 = /{react:(.*?)}/g
                const ass = arguments.slice(1).join(' ').match(matcho)
                let Trigger = arguments[1]
                let leng = 2
                if (arguments[1].includes('"')) ass.map(e => {
                    leng = e.replace('"', '').replace('"', '').split(/[ ]+/).length
                    Trigger = `${e.replace('"', '').replace('"', '')}`
                })
                let Response = arguments.slice(leng).join(' ')
                if (arguments[1].includes('"')) Response = arguments.slice(leng + 1).join(' ')
                if (!Trigger) return message.channel.send("Please specify a trigger.")
                if (!Response) return message.channel.send("Please enter the response.")
                await AR.findOne({ Guild: message.guild.id }, async (err, data) => {
                    if (data) {
                        let jas = false
                        data.Ars.map((v, i) => {
                            if (v.Trigger === Trigger) jas = true
                        })
                        if (jas) return message.channel.send("This ar already exists.")
                        let lengj = 0
                        let pop = Response.match(matcho2)
                        let golpas = Response.replace('{react:', '').replace('}', '')
                        let emoj = 'waiting'
                        if (Response.match(matcho2)) goss = pop.map(e => {
                            lengj = e.replace('"', '').replace('"', '').split(/[ ]+/).length
                            emoj = `${e}`.replace('{react:', '').replace('}', '').replace(/\s/g, '')
                        })

                        let cleared = Response
                        if (pop) cleared = Response.replace(pop[0], '')


                        let obj = {
                            Trigger,
                            Response

                        }
                        if (Response.includes('{react:')) {
                            obj = {
                                Trigger,
                                Response: cleared,
                                Emoji: emoj.split(',')
                            }
                        }




                        data.Ars.push(obj)
                        data.save()


                        message.channel.send(':white_check_mark: | Added trigger.')
                    } if (!data) {
                        let lengj = 0
                        let pop = Response.match(matcho2)
                        let golpas = Response.replace('{react:', '').replace('}', '')
                        let emoj = 'waiting'
                        if (Response.match(matcho2)) goss = pop.map(e => {
                            lengj = e.replace('"', '').replace('"', '').split(/[ ]+/).length
                            emoj = `${e}`.replace('{react:', '').replace('}', '').replace(/\s/g, '')
                        })

                        let cleared = Response
                        if (pop) cleared = Response.replace(pop[0], '')
                        if (!Response.includes('{react:')) {
                            await new AR({
                                Guild: message.guild.id,
                                Ars: [
                                    {
                                        Trigger,
                                        Response
                                    }
                                ]
                            }).save()
                        }
                        if (Response.includes('{react:')) {
                            await new AR({
                                Guild: message.guild.id,
                                Ars: [
                                    {
                                        Trigger,
                                        Response: cleared,
                                        Emoji: emoj.split(',')
                                    }
                                ]
                            }).save()
                        }


                        message.channel.send(':white_check_mark: | Added trigger.')
                    }
                })
            } else if (arguments[0].toLowerCase() === 'remove') {
                const Trigger = arguments.slice(1).join(' ')

                await AR.findOne({ Guild: message.guild.id }, async (err, data) => {
                    if (data) {
                        let kas = false
                        data.Ars.forEach((v, i) => {
                            if (v.Trigger === arguments.slice(1).join(' ')) {
                                kas = true
                                data.Ars.splice(i, 1)
                                data.save()
                            }
                        })
                        if (kas) message.channel.send(":white_check_mark: | Removed trigger.")
                        if (!kas) return message.channel.send("That trigger doesn't exist.")
                    } if (!data) {
                        message.channel.send("There isn't any triggers added.")
                    }
                })
            }
        }


    }
}