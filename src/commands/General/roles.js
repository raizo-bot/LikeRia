const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
    name: "roles",
    desc: "Shows The Server Roles",
    category: "General",
    aliases: [],
    memberPerm: [],
    botPerm: [],
             
    });
  }

  async run(client, message, args) {
    let m = ""
    let ros = message.guild.roles.cache.size ;
for (let i = 0; i < ros; i++) {
          m += `${message.guild.roles.cache
            .filter(r => r.position == ros - i)
            .map(r => r)} ${message.guild.roles.cache
            .filter(r => r.position == ros - i)
            .map(r => `| Members: ${r.members.size}`)}\n`;
        }
const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
const description = m;
 let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`${message.guild.name} Roles`, message.guild.iconURL({dynamic:true}))
    .setThumbnail(message.guild.iconURL({dynamic:true}))
    .setTitle(`Total \`${message.guild.roles.cache.size}\` of roles `)
     const splitDescription = splitMessage(description, {
      maxLength: 2000,
      char: "\n",
      prepend: "",
      append: ""
    });
splitDescription.forEach(async (m) => {
embed.setDescription(m);
message.channel.send(embed);
});
  
  
  
  }
};
