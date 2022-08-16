const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "role",
      desc: "(Add/Remove) Roles from users",
      usage: "[p]role [user] <role>",
      category: "Moderation",
      aliases: [],
      memberPerm: ["MANAGE_ROLES"],
      botPerm: ["MANAGE_ROLES"],
      examples: ["{user} Admin"]
    });
  }
  async run(client, msg, args) {
   return msg.channel.send(new MessageEmbed().setDescription("Sorry /;, This command under the development").setColor("#cf1919"))
  }};
