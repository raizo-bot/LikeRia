const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "moveme",
      desc: "Move me a another channel",
      usage: "[p]moveme <channel>",
      category: "Moderation",
      aliases: [],
      memberPerm: [],
      botPerm: ["MANAGE_CHANNELS"],
      examples: []
    });
  }
  async run(client, msg, args) {
    const rooms = [];
    msg.guild.channels.cache.forEach(c => {
      if (c.type !== "voice") return;
      rooms.push(c.name);
    });
    if (!msg.member.voice.channel)
      return msg.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription("You're not in voice channel! ")
      );
    if (!args[0])
      return msg.channel.send(
        new MessageEmbed()
          .setColor("#cf1919")
          .setDescription("You're not supplied the room name ")
      );
    if (isNaN(args)) {
      let channel =
        msg.guild.channels.cache.find(ch => ch.name === args.join(" ")) ||
        msg.mentions.members.first().voice.channel;
      if (!channel)
        return msg.channel.send(
          new MessageEmbed()
            .setColor("#cf1919")
            .setDescription("You're not supplied the room name ")
        );
      msg.member.voice
        .setChannel(channel)
        .then(
          msg.channel.send(
          new MessageEmbed().setColor("GREEN")
            .setDescription(`\`${msg.author.username}\` - Moved To ${channel.name}`
          ))
        );
    } else {
      let channel =
        msg.guild.channels.cache.get(args.join(" ")) ||
        msg.guild.members.cache.get(args.join(" ")).voice.channel;
      msg.member.voice
        .setChannel(channel)
        .then(
          msg.channel.send(
          new MessageEmbed().setColor("GREEN")
            .setDescription(`\`${msg.author.username}\` - Moved To ${channel.name}`
          ))
        );
    }
  }
};
