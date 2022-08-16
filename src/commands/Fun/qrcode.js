const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class CreateQRCodeCommand extends BaseCommand {
  constructor() {
    super({
    name: "qrcode",
    description: "createQRCode command",
    category: "Fun"
    });
  }

  async run(client, message) {
    let args = message.content.split(' ').slice(1).join(' ');
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**Please Type a text**`)
    if (!args) return message.channel.send(embed);
    message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
   let image = await canvacord.Canvas.createQRCode(args);
   let attachment = new Discord.MessageAttachment(image, "createQRCode.png");
    message.channel.send(attachment);
  }
};
