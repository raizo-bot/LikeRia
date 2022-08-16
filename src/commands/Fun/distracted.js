const BaseCommand = require("../../utils/structures/BaseCommand");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = class SlapCommand extends BaseCommand {
  constructor() {
    super({
    name: "distracted",
    description: "distracted command",
    category: "Fun"
    });
  }

  async run(client, message, args) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
  //  let user1 = message.author;
    let [user1, user2, user3] = message.mentions.users.first(3);
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**Please Mention next time 3 users**`)
    if (!user1 || !user2 || !user3) return message.channel.send(embed);
  message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
    let image1 = user1.avatarURL({ dynamic: false, format: 'png' });
    let image2 = user2.avatarURL({ dynamic: false, format: 'png' });
    let image3 =  user3.avatarURL({ dynamic: false, format: 'png' });
    let image = await canvacord.Canvas.distracted(image1, image2, image3);
    let attachment = new Discord.MessageAttachment(image, "distracted.png");
     message.channel.send(attachment);
     
  }
};