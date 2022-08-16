const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class ChangemymindCommand extends BaseCommand {
  constructor() {
    super({
    name: "clyde",
    description: "clyde command",
    category: "Fun"
    });
  }

  async run(client, message) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
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
   let image = await canvacord.Canvas.clyde(args);
   let attachment = new Discord.MessageAttachment(image, "clyde.png");
    message.channel.send(attachment);
  }
};
