const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const url = require("url");
const fetch = require("node-fetch");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "close",
      description: "Deleted opened tickets",
      usage: "[p]close",
      category: "Tickets",
      aliases: [],
      botPerm: ["MANAGE_CHANNELS"],
      memberPerm: [],
      examples:["all"]
    });
  }

  async run(client, message, args, settings) {
    let ticket = settings.Ticketss;
    if (args[0] && args[0].toLowerCase() === "all") {
      let msg = message;
      let cant1 = new Discord.MessageEmbed()
        .setColor("#cf1919")
        .setDescription(`You don't support to use this command!`)
        .setTimestamp();
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(cant1);
      let size = message.guild.channels.cache.filter(c =>
        c.name.toLowerCase().startsWith("ticket-")
      ).size;
      if (
        message.guild.channels.cache.filter(c =>
          c.name.toLowerCase().startsWith("ticket-")
        ).size < 1
      )
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#cf1919")
            .setDescription(
              `There aren't any tickets opened to execute this command!`
            )
        );
      await msg.react("✅");
      await msg.react("❌");
      let filter = (reaction, user) =>
        ["✅", "❌"].includes(reaction.emoji.name) &&
        !user.bot &&
        user.id === message.author.id;
      let reactions = await msg.awaitReactions(filter, {
        max: 1,
        time: 60000,
        errors: ["time"]
      });
      let choice = reactions.get("✅") || reactions.get("❌");
      if (choice.emoji.name === "✅") {
        message.guild.channels.cache
          .filter(c => c.name.toLowerCase().startsWith("ticket-"))
          .forEach(channel => {
            channel.delete();
          });
        let succes = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setFooter(
            `${message.author.username}`,
            message.author.avatarURL({ dynamic: true })
          )
          .setDescription(
            `All tickets\`(${size})\` have been deleted successfully!`
          )
          .setTimestamp();
        return message.channel.send(succes);
      }
      if (choice.emoji.name === "❌") {
        message.delete();
      }
    } else if (!args[0]) {
      let off = new Discord.MessageEmbed()
        .setColor("#cf1919")
        .setDescription("Tickets are `Off`.");
          if (ticket.toggle === "off") return message.channel.send(off);
      let error = new Discord.MessageEmbed()
        .setColor("#cf1919")
        .setDescription(`You can't use this command outside tickets!`);
      let role;
      if (ticket.role) role = ticket.role;
      let cant = new Discord.MessageEmbed()
        .setColor("#cf1919")
        .setDescription(`You don't support to use this command!`)
        .setTimestamp();
      if (
        !message.guild
          .member(message.author)
          .roles.cache.find(r => r.id === role) &&
        !message.member.hasPermission("ADMINISTRATOR")
      )
        return message.channel.send({ embed: cant });
      if (!message.channel.name.startsWith(`ticket-`))
        return message.channel.send({ embed: error });
      message.react("✅").then(() => message.react("❌"));
      const filter = (reaction, user) => {
        return reaction.emoji.name === "✅" && user.id === message.author.id;
      };

      const collector = message.createReactionCollector(filter, {
        time: 15000
      });

      collector.on("collect", (reaction, user) => {
        message.reactions
          .removeAll()
          .catch(error => console.error("Failed to clear reactions: ", error));
        message.channel.delete();
      });

      const filter1 = (reaction, user) => {
        return reaction.emoji.name === "❌" && user.id === message.author.id;
      };

      const collector1 = message.createReactionCollector(filter1, {
        time: 15000
      });

      collector1.on("collect", (reaction, user) => {
        message.reactions
          .removeAll()
          .catch(error => console.error("Failed to clear reactions: ", error));
        message.delete();
      });
    }
  }
};
