const BaseCommand = require("../../utils/structures/BaseCommand");
const jimp = require('jimp');
const Discord = require('discord.js');
module.exports = class BadCommand extends BaseCommand {
  constructor() {
    super({
      name: "position",
      description: "meme command",
      category: "Fun",
      aliases: []
    });
  }

  async run(client, message) {
    let user = message.mentions.users.first();
    if (!user) {
return message.channel.send
    (new Discord.MessageEmbed()
    .setColor("#FF5555")
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setDescription(`Please ping someone`));
  }
      let image1 = message.author.avatarURL({dynamic : false, format : 'png'});
      let image2 = user.avatarURL({dynamic : false, format : 'png'})
      let base = await jimp.read(`https://cdn.discordapp.com/attachments/804372460299616256/808712046152646686/B2qtXGFIgAESuVZ.jpg`);
        image1 = await jimp.read(image1);
        image2 = await jimp.read(image2);
        image1.circle();
        image2.circle();
        base.resize(960, 540);
        image1.resize(170, 170);
        image2.resize(170,170);
        base.composite(image1, 600, 50);
        base.composite(image2, 500, 300);
        let raw;
        base.getBuffer(`image/png`, (err, buffer) => {
          raw = buffer;
        });
        message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
        const attachment = new Discord.MessageAttachment(raw, 'moon.png')
        message.channel.send(attachment)
  }
};

