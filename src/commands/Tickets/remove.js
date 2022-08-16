const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const url = require("url");
const fetch = require("node-fetch");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "remove",
      description: "To remove user from the ticket channel",
      usage: "[p]remove <user>",
      category: "Tickets",
      aliases: [],
      botPerm: ["MANAGE_CHANNELS"],
      memberPerm: [],
      examples:["{user}"]
    });
  }

  async run(client, message, args, settings) {
    let ticket = settings.Ticketss;
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
  let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  let embed3 = new Discord.MessageEmbed()
    .setColor("#cf1919")
    .setFooter(`${message.author.username}`, message.author.avatarURL({dynamic:true}))
    .setDescription(`Make sure to mention or type user's id next time!`)
  if(!user) return message.channel.send({ embed: embed3 })
    let k = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setFooter(`${message.author.username}`, message.author.avatarURL({dynamic:true}))
    .setDescription(`${user} , Has Been Removed From This Ticket.`)
message.channel.permissionOverwrites
    .get(user.user.id)
    .delete()
    .then(() => {
      message.channel.send({ embed: k });
    })
  }
};
