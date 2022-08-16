const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "nick",
      desc: "Change nickname for user",
      usage: "[p]nick <user>",
      category: "Moderation",
      aliases: [],
      memberPerm: ["MANAGE_NICKNAMES"],
      botPerm: ["MANAGE_NICKNAMES"],
      examples:["{user}"]
    });
  }
  async run(client, message, args) {
    if (!args[0])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setFooter(
            `${message.author.tag}`,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor("#cf1919")
          .setDescription(`Make sure to mention or type user's id next time!`)
      );

    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.member;
    if (!member)
      return message.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription(`I can't find __\`${args[0]}\`__`)
      );

    if (
      member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >=
      0
    )
      return message.channel.send(
        new Discord.MessageEmbed()
          .setFooter(
            `${message.author.tag}`,
            message.author.avatarURL({ dynamic: true })
          ).setColor("#cf1919")
          .setDescription(
            `I can't manage **__${member.user.username}__** - please check my role and permissions.`
          )
      );

    if (!args[1]) {
      member.setNickname("");
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setFooter(
            `${message.author.tag}`,
            message.author.avatarURL({ dynamic: true })
          )
          .setDescription(`\`${member.user.username}\` reseted nickname`)
      );
    }

    let nick = args.slice(1).join(" ");

    try {
      member.setNickname(nick);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setFooter(
            `${message.author.tag}`,
            message.author.avatarURL({ dynamic: true })
          )
          .setDescription(
            `**__${member.user.username}__** - changed nickname to \`${nick}\``
          )
      );
    } catch {
      return;
    }
  }
};
