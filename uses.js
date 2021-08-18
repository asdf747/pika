async function pp(client, message, arguments, economy){
    await economy.findOne({ id: message.author.id }, async(err, data) => {
        if(data){
            await data.Inventory.findOneAndUpdate({ Name: "PP" }, { $inc: {Count: -1} })
            
        }
    })
    return `You just lost one pp lolololl`
}

module.exports = {
    pp
}