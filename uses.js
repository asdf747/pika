async function pp(client, message, arguments, economy){
    await economy.findOne({ id: message.author.id }, async(err, data) => {
        if(data){
            await economy.updateOne({ "id": message.author.id, "Inventory.Name": "PP" }, { $inc: {"Inventory.$.Count": -1} })
            message.channel.send("You just lost a pp lol")
        }
    })
}

module.exports = {
    pp
}