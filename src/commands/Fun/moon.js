const BaseCommand = require("../../utils/structures/BaseCommand");

const jimp = require('jimp');

const Discord = require('discord.js');

module.exports = class BadCommand extends BaseCommand {

  constructor() {

    super({

    name: "moon",

    description: "meme command",

    category: "Fun"

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
message.channel.send("Please wait")

    .then(msg =>{

    msg.edit('Loading...');

    msg.delete({timeout:1000})

    }) 
        let image1 = user.avatarURL({ dynamic: false, format: 'png' })

        let base = await jimp.read(`https://cdn.discordapp.com/attachments/804522050793635864/804777099251548250/PicsArt_01-29-07.14.56.jpg`);

        image1 = await jimp.read(image1);

        image1.circle();

        base.resize(1547, 1080);

        image1.resize(290, 290);

        base.composite(image1, 60, 470);

        let raw;

        base.getBuffer(`image/png`, (err, buffer) => {

          raw = buffer;

        });

        const attachment = new Discord.MessageAttachment(raw, 'moon.png')

        message.channel.send(attachment)

  }

};
