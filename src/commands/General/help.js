const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "help",
      desc: "Shows the list",
      category: "General",
      aliases: [],
      usage: "[p]help <command>",
      memberPerm: [],
      botPerm: [],
      examples: ["kick", "ping"]
    });
  }

  async run(client, message, args, settings) {
    const embed = new Discord.MessageEmbed()
      .setColor("#2f3136")
          .setAuthor(message.guild.name, message.guild.iconURL())
      .setFooter(
        `Requested by: ${message.author.tag} | ${client.commands.size}`
      );
    const prefix = settings.prefix;
    if (!args[0]) {
      let General = client.commands
          .filter(x => x.category === "General")
          .map(z => `\`${z.name}\``)
          .join("**,** "),
        Moderation = client.commands
          .filter(x => x.category === "Moderation")
          .map(z => `\`${z.name}\``)
          .join("**,** "),
        Economy = client.commands
          .filter(x => x.category === "Economy")
          .map(z => `\`${z.name}\``)
          .join("**,** "),
        Fun = client.commands
          .filter(x => x.category === "Fun")
          .map(z => `\`${z.name}\``)
          .join("**,** "),
        Music = client.commands
          .filter(x => x.category === "Music")
          .map(z => `\`${z.name}\``)
          .join("**,** "),
        Settings = client.commands
          .filter(x => x.category === "Settings")
          .map(z => `\`${z.name}\``)
          .join("**,** "),
        Tickets = client.commands
          .filter(x => x.category === "Tickets")
          .map(z => `\`${z.name}\``)
          .join("**,** ");
let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
      return message.channel.send(
        new Discord.MessageEmbed()
      .setColor("#2f3136")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setFooter(
            `Requested by: ${message.author.tag} | Total Commands [${client.commands.size}]`,
            message.author.avatarURL({ dynamic: true })
          )
          .addField("__General:__", General)
          .addField("__Moderation:__", Moderation)
          .addField("__Economy:__", Economy)
          .addField("__Fun:__", Fun)
          .addField("__Tickets:__", Tickets)
          .addField("__Music:__", Music)
          .addField("__Settings:__", Settings)
          .addField(
            "__Other Links:__",
            `[Support](${client.settings.support}) | [Dashboard](${client.settings.web}) | [Invite](${invite})`
          )
      );
    } else {
      const command =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));

      if (command) {
        embed.setTitle(client.user.username + " Help");
        embed.addField("Command Name", command.name);
        embed.setDescription(`Description: ${command.desc || "None"}`);
        embed.addField(
          "Command Aliases",
          command.aliases.length !== 0
            ? command.aliases.join("|")
            : "No Aliases provided."
        );
        embed.addField(
          "Required Permission(s)",
          `Member: \`${
            command.memberPerm.length !== 0
              ? command.memberPerm.join("|")
              : "No Perm"
          }\`\nBot: \`${
            command.botPerm.length !== 0 ? command.botPerm.join("|") : "No Perm"
          }\``
        );
        embed.addField(
          "Command Usage",
          command.usage.replace("[p]", prefix) || `${prefix}${command.name}`
        );
        if (command.examples) {
          embed.addField(
            "Examples",
            `${prefix}${command.name} ${command.examples
              .join(" `|` " + prefix + "" + command.name + " ")
              .replace("{user}", message.author).replace("{channel}", message.channel)
            }`
          );
        }
        return message.channel.send(embed);
      } else {
        const cmds = client.commands.filter(
          c => c.category.toLowerCase() == args[0].toLowerCase()
        );

        if (!cmds || cmds.size == 0)
          return message.channel.send(embed.setDescription(`I can't find this \`<command/aliases/category>\``));
          embed.setTitle(`[ ${args[0].toUpperCase()} ] - ${cmds.size}`)
                embed.setDescription(`${cmds.map(x => `\`${x.name}\``).join("**,** ")}`)
        message.channel.send(embed);
}}
  }
};
