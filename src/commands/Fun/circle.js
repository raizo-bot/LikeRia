const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class CircleCommand extends BaseCommand {
  constructor() {
    super({
    name: "circle",
    description: "circle command",
    category: "Fun"
    });
  }

  async run(client, message, args) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
    let user = message.mentions.users.first() || message.author;
    let avatar = user.avatarURL({ dynamic: false, format: 'png' });
  message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
    let image = await canvacord.Canvas.circle(avatar);
    let attachment = new Discord.MessageAttachment(image, "circle.png");
     message.channel.send(attachment);
  }
};
