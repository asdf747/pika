const shop = require('../shop.json')
const Pagination = require('discord-paginationembed')
const { MessageEmbed } = require('discord.js')
const economy = require('../models/economy')

module.exports = {
    commands: 'shop',
    callback: async(message, arguments, text, client) => {
        if(arguments[0]){
            let item = shop.find(item => item.ID.includes(arguments[0].toLowerCase()))
            if(!item) return message.channel.send("This item doens't exist.")
            let finding = await economy.findOne({ id: message.author.id })
            let counter = 0
            if(finding && finding.Inventory.length){
                counting = finding.Inventory.find(item => item.Name.toLowerCase() === item.Name.toLowerCase())
                counter = counting.Count
            }
            message.channel.send(
                new MessageEmbed()
                .setTitle(`${item.Name} ${counter !== 0 ? `(${counter} owned)` : ''}`)
                .setDescription(`${item.Description}\n\n**Buy:** ${item.Price}\n**Sell:** ${item.Sell}`)
                .setThumbnail(item.Image)
            )
            return
        }
        let items = shop.filter(item => item.Shop).map(item => `**${item.Emoji} ${item.Name}** - ${item.Price}\n${item.Description}\n`)
        if(!items.length) items = ["Empty"]
    const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(items)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(5)
    .setPageIndicator(true)
    .formatField('Items: ', el => el);

FieldsEmbed.embed
  .setTitle(`Shop`)

FieldsEmbed.build();
    }
}