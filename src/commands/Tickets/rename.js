const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const url = require("url");
const fetch = require("node-fetch");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "rename",
      description: "Renames a ticket channel",
      usage: "[p]rename",
      category: "Tickets",
      aliases: [],
      botPerm: ["MANAGE_CHANNELS"],
      memberPerm: [],
      examples:["done"]
    });
  }

  async run(client, message, args, settings) {
    let ticket = settings.Ticketss;
    let ch = message.content
      .split(" ")
      .slice(1)
      .join(" ");
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
    let Name = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setFooter(
        `${message.author.username}`,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(`Please specify new channel name.`);

    let done = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setFooter(
        `${message.author.username}`,
        message.author.avatarURL({ dynamic: true })
      )
        .setDescription(`Ticket name has been changed To: \`ticket-${ch}\``);
    if (!ch)
      return message.channel
        .send(Name)
    message.channel.setName(`ticket-${ch}`).then(() => {
      return message.channel.send(done);
    });
  }
};
