const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = require('alexflipnote.js');
const alexclient = new client('RcrZqbJZdr_IPOWSauKb_0EFNWbDyryf9D2OeUH0');
module.exports = class ChallengeCommand extends BaseCommand {
  constructor() {
    super({
    name: "challenge",
    description: "challenge command",
    category: "Fun"
    });
  }

  async run(client, message) {
    let args = message.content.split(" ").slice(1);
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**Please Type a text**`)
    if (!args[0]) return message.channel.send(embed);
      message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
   let image = await alexclient.image.challenge({text: args.join(" ")});
   let attachment = new Discord.MessageAttachment(image, "challenge.png");
    message.channel.send(attachment);
  }
};
