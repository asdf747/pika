const shop = require('../shop.json')
const Pagination = require('discord-paginationembed')

module.exports = {
    commands: 'shop',
    callback: async(message, arguments, text, client) => {
        let items = shop.map(item => `**${item.Name}** - ${item.Price}\n${item.Description}\n`)
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