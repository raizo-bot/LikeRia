const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "say",
      desc: "Say a something by the bot",
      usage: "[p]say <msg>",
      category: "Moderation",
      aliases: [],
      memberPerm: ["MANAGE_GUILD"],
      botPerm: ["MANAGE_GUILD"],
      examples: ["/;"]
    });
  }
  async run(client, message, args) {
        if (message.deletable) await message.delete().catch(() => null)
        return message.channel.send(args.join(' ') || 'Nothing')
  }
};
