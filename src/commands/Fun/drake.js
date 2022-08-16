const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = require('alexflipnote.js');
const alexclient = new client('RcrZqbJZdr_IPOWSauKb_0EFNWbDyryf9D2OeUH0');
module.exports = class DidyoumeanCommand extends BaseCommand {
  constructor() {
    super({
    name: "drake",
    description: "drake command",
    category: "Fun"
    });
  }

  async run(client, message, args) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
    let newArgs = args.join(" ");
    newArgs = newArgs.split("; ");
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**Please Type a text**

usage:
drake \`first text; second text\`**`)
    if (!newArgs[0]) return message.channel.send(embed);
    let embed1 = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**Please Type a second text**`)
    if (!newArgs[1]) return message.channel.send(embed1);
  message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
   let image = await alexclient.image.drake({top: newArgs[0],bottom: newArgs[1]});
   let attachment = new Discord.MessageAttachment(image, "drake.png");
    message.channel.send(attachment);
  }
};