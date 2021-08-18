const economy = require('../models/economy')
const { MessageEmbed } = require('discord.js')
const Pagination = require('discord-paginationembed')
const items = require('../shop.json')

module.exports = {
    commands: ['inventory', 'inv'],
    description: "Displays the user's inventory.",
    callback: async (message, arguments, text, client) => {
        let mem = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]) || message.member
        await economy.findOne({ id: mem.id }, async (err, data) => {
            if(data){
                let inv = data.Inventory.map(item => {
                    let itemid = items.find(ite => ite.Name.toLowerCase() === item.Name.toLowerCase()).ID[0]
                    return `${item.Name} - ${item.Count}\nID: \`${itemid}\``
                })
                if(!inv.length) inv = ['Empty']
                const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(inv)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(10)
    .setPageIndicator(true)
    .formatField('Items: ', el => el);

FieldsEmbed.embed
  .setTitle(`${mem.user.tag}'s inventory.`)

FieldsEmbed.build();
            }if(!data){
                let inv = ['Empty']
                const FieldsEmbed = new Pagination.FieldsEmbed()
    .setArray(inv)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setElementsPerPage(10)
    .setPageIndicator(true)
    .formatField('Items: ', el => el);

FieldsEmbed.embed
  .setTitle(`${mem.user.tag}'s inventory.`)

FieldsEmbed.build();
            }
        })
    }
}