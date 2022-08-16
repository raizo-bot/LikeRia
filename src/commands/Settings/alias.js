const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "alias",
      desc: "(Show/Edit) Server's Aliases",
      category: "Settings",
      aliases: [],
      usage: "[p]alias",
      memberPerm: ["ADMINISTRATOR"],
      botPerm: [],
      examples: []
    });
  }

  async run(client, message, args, settings) {
    if (!args[0])
      return message.channel.send(
        new Discord.MessageEmbed({
          fields: [
            {
              name: "add [command] <alias>",
              value: "Adds a single alias. This is really only"
            },
            {
              name: "list",
              value: "Show Server's Aliases List"
            },
            {
              name: "purge [alias]",
              value: "Clears all aliases in the server"
            }
          ]
        })
          .setColor("#cf1919")
          .setTitle("Aliases Help List")
          .setFooter(
            `Reqeusted By: ${message.author.tag}`,
            message.author.avatarURL({ dynamic: true })
          )
      );
    if (args[0] && args[0].toLowerCase() === "add") {
      const command =
        client.commands.get(args[1].toLowerCase()) ||
        client.commands.get(client.aliases.get(args[1].toLowerCase()));
      if (!command)
        return message.channel.send({
          embed: new Discord.MessageEmbed()
            .setDescription(`I can't find this command.`)
            .setColor("#cf1919")
        });
      if (!args[2])
        return message.channel.send({
          embed: new Discord.MessageEmbed()
            .setDescription(`Please type the alias next time to create it`)
            .setColor("#cf1919")
        });
      if (args[2].length > 8)
        return message.channel.send({
          embed: new Discord.MessageEmbed()
            .setDescription(`The max alias length is \`8\``)
            .setColor("#cf1919")
        });
      if (settings.aliases.find(x => x.name == args[2].toLowerCase())) {
        return message.channel.send({
          embed: new Discord.MessageEmbed()
            .setDescription(`You can't add same alias`)
            .setColor("#cf1919")
        });
      }
      if (settings.aliases.length > 8)
        return message.channel.send({
          embed: new Discord.MessageEmbed()
            .setDescription(
              `The max alias length for \`${command.name}\` is \`8\``
            )
            .setColor("#cf1919")
        });
      await client.db.server.findOneAndUpdate(
        { id: message.guild.id },
        {
          $push: {
            aliases: [{ name: args[2].toLowerCase(), command: command.name }]
          }
        }
      );
      message.channel.send({
        embed: new Discord.MessageEmbed()
          .setDescription(
            `You have created \`${args[2]}\` alias for: **\`${command.name}\`**`
          )
          .setColor("GREEN")
      });
    } else if (args[0] && args[0].toLowerCase() === "purge") {
      if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription("You don't have permission `Administrator`")
            .setColor("#cf1919")
        );
      if (!settings.aliases.find(x => x.name == args[2].toLowerCase()))
        return message.channel.send({
          embed: new Discord.MessageEmbed()
            .setDescription(`I can't find this aliase.`)
            .setColor("#cf1919")
        });
      await client.db.server.findOneAndUpdate(
        { id: message.guild.id },
        {
          aliases: settings.aliases.filter(
            x => x.name !== args.join(" ").toLowerCase()
          )
        }
      );
      message.channel.send({
        embed: new Discord.MessageEmbed()
          .setDescription(`You have removed \`${args[2]}\``)
          .setColor("GREEN")
      });
    } else if (args[0] && args[0].toLowerCase() === "list") {
      const database = settings.aliases;
      if (database.name === null)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription("This server do not have any aliases.")
        );
      const data = database.filter(val => val && val.name && val.command);
      if (data.length <= 0)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription("This server do not have any aliases.")
        );

      const embed = {
        title: `Aliases List Of ${message.guild.name}`,
        color: 3447003,
        footer: {
          text: `Requested By: ${message.author.tag}`,
          icon_url: message.author.avatarURL({ dynamic: true })
        },
        fields: []
      };

      for (const name of new Set(data.map(r => r.name))) {
        embed.fields.push({
          name: `Name: __${name}__`,
          value: `${data
            .filter(r => r.name === name)
            .map(
              r => `Command Name: \`${r.command}\` | Alias: \`${r.name}\``
            )}`,
          inline: true
        });
      }

      message.channel.send({ embed });
    }
  }
};
