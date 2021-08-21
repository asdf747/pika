const { readdirSync } = require('fs');
const { join } = require('path');
const eventDir = join(__dirname, ".", "economyEvents");

module.exports.run = (client) => {
  const eventFiles = readdirSync(eventDir);

  for(const eventFile of eventFiles){
    const event = require(`${eventDir}/${eventFile}`);
    const eventName = eventFile.split(".").shift();
    client.economy.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`${eventDir}/${eventFile}`)];
  }
  client.eventss = eventFiles.length;
  console.log(`Loaded ${eventFiles.length} events.`);
}