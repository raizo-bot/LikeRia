const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class BadCommand extends BaseCommand {
  constructor() {
    super({
    name: "bad",
    desc: "None",
    usage: "[p]bad",
    category: "Fun"
    });
  }

  async run(client, message) {
   let user = message.mentions.users.first() || message.author;
   let embed = new Discord.MessageEmbed()
   .setColor('#FF0000')
   .setDescription(`Please Mention User`)
   if (!user) return message.channel.send(embed);
   let avatar = user.avatarURL({ dynamic: false, format: 'png' });
   message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
   let image = (`https://api.alexflipnote.dev/bad?image=${avatar}`);
   let attachment = new Discord.MessageAttachment(image, "bad.png");
    message.channel.send(attachment);
  }
};