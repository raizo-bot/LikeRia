const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const moment = require("moment");
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "support",
      desc: "Gets the server support url of bot",
      usage: "[p]support",
      category: "General",
      aliases: [],
      botPerm: [],
      memberPerm: [],
      examples: []
    });
  }

  async run(client, message, args) {
let invite = client.settings.support;
let embed = new Discord.MessageEmbed().setTitle("Click Here").setURL(invite)
.setColor('#AB8700')
.setTimestamp()
.setFooter(client.user.tag, client.user.avatarURL());
  message.channel.send(embed)      

  }
};
