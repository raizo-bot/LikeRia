const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "move",
      desc: "Move user to another channel",
      usage: "[p]move <channel>",
      category: "Moderation",
      aliases: [],
      memberPerm: ["MANAGE_CHANNELS"],
      botPerm: ["MANAGE_CHANNELS"],
      examples: []
    });
  }
  async run(client, msg, args) {
  let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));
    if (!args[0] || !user) {return msg.channel.send(new MessageEmbed().setColor("#cf1919").setFooter(`${msg.author.username}`,msg.author.avatarURL({ dynamic: true })).setDescription(`Make sure to mention or type user's id next time!`)
      );
    }

    if (!user.voice.channel)
      return msg.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription("He's not in voice channel! ")
      );
    if (!args[1])
      return msg.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription("You're not supplied the room name ")
      );
    if (isNaN(args)) {
      let channel =
        msg.guild.channels.cache.find(ch => ch.name === args[1]) ||
        msg.mentions.members.first().voice.channel;
      if (!channel)
        return msg.channel.send(
          new MessageEmbed()
            .setColor("#cf1919")
            .setDescription("You're not supplied the room name ")
        );
      user.voice
        .setChannel(channel)
        .then(
          msg.channel.send(
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `\`${user.user.username}\` - Moved To ${channel.name}`
              )
          )
        );
    } else {
      let channel =
        msg.guild.channels.cache.get(args[1]) ||
        msg.guild.members.cache.get(args[1]).voice.channel;
      user.voice
        .setChannel(channel)
        .then(
          msg.channel.send(
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `\`${user.user.username}\` - Moved To ${channel.name}`
              )
          )
        );
    }
  }
};
