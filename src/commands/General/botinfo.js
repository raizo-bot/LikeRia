const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const moment = require("moment");
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "botinfo",
      desc: "Shows The Bot Informations",
      usage: "[p]botinfo",
      category: "General",
      aliases: ["bot"],
      botPerm: [],
      memberPerm: [],
      examples: []
    });
  }

  async run(client, message, args) {
    const os = require("os");
    const o = bytes => {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    };
    const usage = process.memoryUsage().heapUsed,
      total = os.totalmem(),
      free = total - usage;

    return message.channel.send(
      new Discord.MessageEmbed().setColor("#AB8700")
      .setTitle(`${client.user.username}'s Informations`)
      .setThumbnail(client.user.avatarURL({format:"png"}))
      .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({dynamic: true}))
        .setDescription(`\`\`\`md\n- I'm a bot\`\`\``)
        .addField(
          "Basic Informations",
          `
Total Commands: \`${client.commands.size}\`       
Total Servers: \`${client.guilds.cache.size}\`              
Total Users: \`${client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString("en")}\`
Total Channels: \`${client.channels.cache.size}\`

`)
        .addField(
          "Memory Informations",
          `Total: \`${o(total)}\`\nUsed: - \`${o(usage)}\`\nFree: + \`${o(total - usage)}\`

`
        )
    );
  }
};
