const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = require('alexflipnote.js');
const alexclient = new client('RcrZqbJZdr_IPOWSauKb_0EFNWbDyryf9D2OeUH0');
module.exports = class PlogoCommand extends BaseCommand {
  constructor() {
    super({
    name: "plogo",
    description: "plogo command",
    category: "Fun"
    });
  }

  async run(client, message) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
    let args1 = message.content
    .split(" ")
    .slice(1)
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`Please Type a first text`)
    if (!args1[0]) return message.channel.send(embed);
    let embed1 = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`Please Type a second text`)
    if (!args1[1]) return message.channel.send(embed1);
    message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
    msg.delete({timeout:1000})
    }) 
    let image = await alexclient.image.pornhub({text: args1[0],text2: args1[1]});
   let attachment = new Discord.MessageAttachment(image, "plogo.png");
    message.channel.send(attachment);
  }
};
