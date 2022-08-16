const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "show",
      desc: "Show a channels",
      usage: "[p]show <channel>",
      category: "Moderation",
      aliases: [],
      memberPerm: ["MANAGE_CHANNELS"],
      botPerm: ["MANAGE_CHANNELS"],
      examples: ["{channel}"]
    });
  }
  async run(client, message, args) {
    let ch = message.mentions.channels.first() || message.channel;
    ch.updateOverwrite(message.guild.id, {VIEW_CHANNEL: true})
    let embed33 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<#${ch.id}> got \`hidden\``);
    message.channel.send(embed33);
  }
};
