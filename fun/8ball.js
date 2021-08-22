module.exports = {
  commands: '8ball',
  minArgs: 1,
  expectedArgs: '<question>',
  callback: async (message, arguments, text, client) => {
    const answers = ["Yes","No","I think so","No you","If you're gay/lesbo, definitely","Ig I'll pretend you never asked this","Can't answer rn busy watching hentai"];
        const answer1 = answers[Math.floor(Math.random() * answers.length)];
        const answer = answer1.charAt(0).toUpperCase() + answer1.substring(1);

        message.channel.send(`:8ball: | ${answer}. - **${message.author.tag}**`)
  }
}