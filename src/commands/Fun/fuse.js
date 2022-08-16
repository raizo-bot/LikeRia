const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class SlapCommand extends BaseCommand {
  constructor() {
    super({
    name: "fuse",
    description: "fuse command",
    category: "Fun"
    });
  }

  async run(client, message, args) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
    let user = message.mentions.users.first();
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`Mention a user next time.`)
    if (!user) return message.channel.send(embed);
    let image3 = ('https://tenor.com/view/seriously-side-eye-confused-gif-8776030');
    let attachment1 = new Discord.MessageAttachment(image3, "what.gif");
    if (user == message.author)
    return message.reply("Seriously?",attachment1);
    message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
    let image1 = user.avatarURL({ dynamic: false, format: 'png' });
    let image2 =  message.author.avatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.Canvas.fuse(image2, image1);
    let attachment = new Discord.MessageAttachment(image, "fuse.png");
     message.channel.send(attachment);
     
  }
};