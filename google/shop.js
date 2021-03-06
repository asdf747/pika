const shop = require('../shop.json')
const Pagination = require('discord-paginationembed')
const { MessageEmbed } = require('discord.js')
const economy = require('../models/economy')
const utils = require('utils-discord')
const { embedPages } = require('../funcs')
module.exports = {
    commands: 'shop',
    callback: async(message, arguments, text, client) => {
        if(arguments[0]){
            let item = shop.find(item => item.ID.includes(arguments[0].toLowerCase()))
            if(!item) return message.channel.send("This item doesn't exist.")
            let finding = await economy.findOne({ id: message.author.id })
            let counter = 0
            if(finding && finding.Inventory.length){
                counting = await finding.Inventory.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase())
                if(counting) counter = counting.Count
            }
            let embed = new MessageEmbed()
            .setTitle(`${item.Name}`)
            .setDescription(`${item.Description}\n\n**Buy:** ${Number(item.Price) ? Number(item.Price).toLocaleString("en-US") : 'Not able to be purchased'}\n**Sell:** ${Number(item.Sell) ? Number(item.Sell).toLocaleString("en-US") : 'Not able to be sold'}`)
            .setThumbnail(item.Image)
            .setTimestamp()
            .setColor("BLUE")

            if(item.Items) embed.addField(`Items:`, item.Items.map(ass => `\`${ass}\``).join(' '))

            if(counter >= 1) embed.setFooter(`${counter} owned`)


            message.channel.send(embed)
            return
        }
        let items = shop.filter(item => item.Shop).map(item => `**${item.Emoji} ${item.Name}** - ${parseInt(item.Price).toLocaleString("en-US")}\n${item.Description}`)
        if(!items.length) items = ["Empty"]

        let options = {
            perpage: 5,
            title: `Shop`,
            joinBy: "\n\n",
            color: "BLUE",
            args: arguments[0],
            timestamp: true
        }

        embedPages(client, message, items, options)
    }
}