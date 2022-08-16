const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "prefix",
      desc: "(Show/Edit) Server's Prefix",
      category: "Settings",
      aliases: [],
      usage: "[p]prefix",
      memberPerm: [],
      botPerm: [],
      examples: ["+"]
    });
  }

  async run(client, message, args, settings) {
    if (!args[0])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `Prefix of **__${message.guild.name}__** is: \`${settings.prefix}\``
          )
      );
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            "You don't have permission `Administrator` to change prefix"
          )
          .setColor("#cf1919")
      );
    await client.db.server.findOneAndUpdate(
      { id: message.guild.id },
      {
        prefix: args
          .join(" ")
          .substr(0, 5)
          .trim()
      }
    );
    return message.channel.send(
      new Discord.MessageEmbed().setColor("GREEN").setDescription(
        `Done, Successfully set prefix of __**${
          message.guild.name
        }**__ to: __\`${args
          .join(" ")
          .substr(0, 5)
          .trim()}\`__`
      )
    );
  }
};
