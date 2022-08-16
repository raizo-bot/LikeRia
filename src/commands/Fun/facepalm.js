const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class FacepalmCommand extends BaseCommand {
  constructor() {
    super({
    name: "facepalm",
    description: "facepalm command",
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
    let image = await canvacord.Canvas.facepalm(avatar);
    let attachment = new Discord.MessageAttachment(image, "facepalm.png");
     message.channel.send(attachment);
  }
};
