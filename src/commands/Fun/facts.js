const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = require('alexflipnote.js');
const alexclient = new client('RcrZqbJZdr_IPOWSauKb_0EFNWbDyryf9D2OeUH0');
 
module.exports = class SupremeCommand extends BaseCommand {
  constructor() {
    super({
      name: "facts",
      description: "facts command",
      category: "Fun"
    });
  }

  async run(client, message) {
      if(!message.guild.member(client.user).hasPermission("ATTACH_FILES")){
   return message.channel.send("I don't have permission __ATTACH_FILES__")
} 
    let args = message.content.split(" ").slice(1);
    let embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**Please Type a text**`)
    if (!args[0]) return message.channel.send(embed);
  message.channel.send("Please wait")
    .then(msg =>{
    msg.edit('Loading...');
   msg.delete({timeout:1000})
   }) 
        let link = await alexclient.image.facts({text: args.join(" ")});
   let attachment = new Discord.MessageAttachment(link, "facts.png");
    message.channel.send(attachment);
  }
};