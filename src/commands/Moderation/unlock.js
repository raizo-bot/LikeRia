const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "unlock",
      desc: "unlock a channels",
      usage: "[p]unlock <channel>",
      category: "Moderation",
      aliases: [],
      memberPerm: ["MANAGE_CHANNELS"],
      botPerm: ["MANAGE_CHANNELS"],
      examples: ["{channel}"]
    });
  }
  async run(client, message, args) {
    let ch = message.mentions.channels.first() || message.channel;
    ch.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    });
    let embed33 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<#${ch.id}> got \`unlocked\``);
    message.channel.send(embed33);
  }
};
