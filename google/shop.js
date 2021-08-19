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
                counting = finding.Inventory.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase())
                counter = counting.Count
            }
            message.channel.send(
                new MessageEmbed()
                .setTitle(`${item.Name} ${counter >= 1 ? `(${counter} owned)` : ''}`)
                .setDescription(`${item.Description}\n\n**Buy:** ${parseInt(item.Price).toLocaleString("en-US")}\n**Sell:** ${item.Sell}`)
                .setThumbnail(item.Image)
                .setTimestamp()
                .setColor("BLUE")
            )
            return
        }
        let items = shop.filter(item => item.Shop).map(item => `**${item.Emoji} ${item.Name}** - ${parseInt(item.Price).toLocaleString("en-Us")}\n${item.Description}\n`)
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
  .setTimestamp()
  .setColor("BLUE")

FieldsEmbed.build();
    }
}