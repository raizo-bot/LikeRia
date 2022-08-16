const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "kick",
      desc: "kicks a user",
      usage: "[p]kick <user>",
      category: "Moderation",
      aliases: [],
      memberPerm: ["KICK_MEMBERS"],
      botPerm: ["KICK_MEMBERS"],
      examples: ["{user}"]
    });
  }
  async run(client, message, args) {
    const Discord = require("discord.js");
    let args1 = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    let args2 = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!args1) args1 = "No Reason";
    const user =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args2);
    if (!user)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription("Missing argument, the `user` argument is required!")
          .setColor("#cf1919")
      );
    if (
      message.author.id !== message.guild.ownerID &&
      message.member.roles.highest.comparePositionTo(user.user.roles.highest) <=
        0
    ) {
      let embedii = new MessageEmbed()
        .setColor("#cf1919")
        .setDescription(`You are unable to kick \`${user.user.tag}\``);
      return message.channel.send(embedii);
    }
    if (
      message.guild.member(user).roles.highest.position >=
      message.guild.member(message.client.user).roles.highest.position
    )
      return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(
            `I can't manage \`${user.user.username} - please check my permissions/position\``
          )
      );
    if (
      message.guild.member(user).roles.highest.position >=
      message.guild.member(message.author).roles.highest.position
    )
      return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(
            `You can't manage \`${user.user.username} - please check my permissions/position\``
          )
      );
    message.guild.member(user).kick(args1);
    let embedban = new MessageEmbed()
      .setColor("#cf1919")
      .setDescription("I'm can't kick this user <@" + user + ">");
    if (!message.guild.member(user).kickable)
      return message.channel.send(embedban);
    let embed55 = new MessageEmbed()
      .setThumbnail(user.user.avatarURL({ dynamic: true }))
      .setColor("GREEN")
      .setTitle("Kicked User")
      .setDescription(
        " User : <@" +
          user.id +
          "> `(" +
          user.id +
          ")` \nKicked By : <@" +
          message.author.id +
          "> `(" +
          message.author.id +
          ")` "
      )
      .setFooter(
        `Requested By ${message.author.tag}`,
        message.author.avatarURL()
      )
      .setTimestamp();
    message.channel.send(embed55);
  }
};
