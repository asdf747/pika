const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed')
const items = require('../shop.json')
const utils = require('utils-discord')

module.exports = {
    commands: ['inventory', 'inv'],
    description: "Displays the user's inventory.",
    callback: async (message, arguments, text, client) => {
        let mem = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]) || message.member
        await economy.findOne({ id: mem.id }, async (err, data) => {
            if(data){
                let inv = data.Inventory.filter(item => item.Count >= 1).map(item => {
                    let itemo = items.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase())
                    return `**${itemo.Emoji} ${item.Name}** - ${item.Count}\nID: \`${itemo.ID[0].toUpperCase()}\``
                })
                if(!inv.length) inv = ['Empty']

                let options = {
                    perpage: 10,
                    title: `${mem.user.tag}'s inventory.`,
                    joinBy: "\n\n",
                    color: "BLUE",
                    footer: ' ',
                    footerImage: ' ',
                    timestamp: true
                }

                utils.createEmbedPages(client, message, inv, options)
            }if(!data){
                
                let inv = ['Empty']
                let options = {
                    perpage: 10,
                    footer: ' ',
                    footerImage: ' ',
                    title: `${mem.user.tag}'s inventory.`,
                    joinBy: "\n\n",
                    color: "BLUE",
                    timestamp: true
                }

                utils.createEmbedPages(client, message, inv, options)
            }
        })
    }
}