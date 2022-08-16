const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class PhubCommand extends BaseCommand {
  constructor() {
    super({
    name: "phub",
    description: "phub command",
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
   .setDescription(`Please Type a text`)
   if (!args) return message.channel.send(embed);
   let user = message.mentions.users.first() || message.author;
   let avatar = user.avatarURL({ dynamic: false, format: 'png' });
   message.channel.send("Please wait")
   .then(msg =>{
   msg.edit('Loading...');
   msg.delete({timeout:1000})
   }) 
   const image = await canvacord.Canvas.phub({ username: `${message.author.username}`, message: `${args}`, image: `${avatar}` });
   let attachment = new Discord.MessageAttachment(image, "phub.png");
    message.channel.send(attachment);
  }
};
