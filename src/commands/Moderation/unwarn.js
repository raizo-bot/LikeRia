const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const moment = require("moment")
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
    name: "unwarns",
    desc: "Removes Warns from a user",
    usage: "[p]unwarns <user> <id> ",
    category: "Moderation",
    aliases: [],
    memberPerm: ["MANAGE_GUILD"],
    botPerm: ["MANAGE_GUILD"],
    examples: ["{user} 1"] 
             
    });
  }
    async run(client, message, args) {
    
    let g = message.content.split(" ").slice(1).join(" ");
   let sex = message.content.split(" ").slice(2).join(" ")
   let user = message.mentions.users.first() //|| message.guild.members.cache.get(g);
    if(!user)      return message.channel.send(new Discord.MessageEmbed().setDescription("Missing argument, the `user` argument is required!").setColor("#cf1919"))
if(isNaN(sex))      return message.channel.send(new Discord.MessageEmbed().setDescription("Missing argument, the `number` argument is required!").setColor("#cf1919"))
if(!sex)      return message.channel.send(new Discord.MessageEmbed().setDescription("Missing argument, the `number` argument is required!").setColor("#cf1919"))
    const data = await client.getMemberData(user.id, message.guild.id);
if(!data.warns[parseInt(args[1]) - 1])   return message.channel.send(new Discord.MessageEmbed().setDescription("Warn not found").setColor("#cf1919"))
message.channel.send({embed: new Discord.MessageEmbed()
.setColor("GREEN")
.setTitle("Unwarn")
.addField("Member: ", `**${user} (ID: \`${user.id}\`)**`)
.addField("Warn: ", `**\`${data.warns[parseInt(args[1] - 1)].reason}\` (ID: \`${parseInt(args[1])}\`)**`)
.addField("Moderator: ",`**${message.author.username}#${message.author.discriminator} (ID: \`${message.author.id}\`)**`)
.setFooter(`Total Warnings for ${user.username}#${user.discriminator} is ${(data.warns ? data.warns.length : 1) - 1}`)
.setTimestamp()});

await client.db.member.findOneAndUpdate(
      { guildID: message.guild.id, userID: user.id },
      { warns: data.warns.filter(( x , i ) => i !== parseInt(`${args[1]}`) - 1) });
    }
}