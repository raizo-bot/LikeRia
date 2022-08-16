const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const url = require("url");
const fetch = require("node-fetch");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "money",
      desc: "Shows (Someone/Your) Money",
      usage: "[p]money <user>",
      category: "Economy",
      aliases: [],
      examples:["{user}"]
    });
  }

  async run(client, message, args) {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      client.users.cache.get(args[0]);
    const authorData = await client.getUserData(message.author.id);
    if(!user){
  return message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`You have a **__${authorData.coins}__**$.`)
                  .setAuthor(message.author.username, message.author.avatarURL()).setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL()).setTimestamp().setThumbnail(message.author.avatarURL({dynamic:true})))
}
if(user.bot) return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescripiton("The bots don't have money."))
const memberData = await client.getUserData(user.id);
return message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${user.username} have a **__${memberData.coins}__**$.`)
.setAuthor(user.username, user.avatarURL())
.setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL()).setThumbnail(user.avatarURL({dynamic:true})))
      
  }
};
