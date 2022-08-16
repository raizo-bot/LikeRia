const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "enable",
      desc: "Enables a channel or command",
      category: "Settings",
      aliases: [],
      usage: "[p]enable",
      memberPerm: ["ADMINISTRATOR"],
      botPerm: [],
      examples: ["{channel}", "ping"]
    });
  }

  async run(client, message, args, settings) {
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("You don't have permission `Administrator`")
          .setColor("#cf1919")
      );
    if (!args[0])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#cf1919")
          .setDescription("Couldn't find command or channel")
      );
    const command =
      client.commands.get(args[0]) ||
      client.commands.get(client.aliases.get(args[0]));
    const channel = message.mentions.channels.first();
    if (!channel && !command)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#cf1919")
          .setDescription("Couldn't find command or channel")
      );

    if (channel && !command) {
      if (!settings.ignoredChannels.includes(channel.id))
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription("This channel is not disabled.")
        );
      await client.db.server.findOneAndUpdate(
        { id: message.guild.id },
        {
          ignoredChannels: settings.ignoredChannels.filter(
            x => x !== channel.id
          )
        }
      );

      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("Enabled Channel")
          .setDescription(
            `You have been Enabled: __${channel}__ to use commands.`
          )
      );
    } else if (command && !channel) {
      if (!settings.ignoredCommands.includes(command.name))
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription("This command is not disabled.")
        );
      await client.db.server.findOneAndUpdate(
        { id: message.guild.id },
        {
          ignoredCommands: settings.ignoredCommands.filter(
            x => x !== command.name
          )
        }
      );
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("Enabled Command")
          .setDescription(
            `You have been Enabled: __\`${command.name}\`__ command.`
          )
      );
    }
  }
};
