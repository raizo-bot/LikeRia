const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const moment = require("moment");
module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "invite",
      desc: "Gets the invite url of bot",
      usage: "[p]invite",
      category: "General",
      aliases: ["inv"],
      botPerm: [],
      memberPerm: [],
      examples: []
    });
  }

  async run(client, message, args) {
let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
let embed = new Discord.MessageEmbed().setTitle("Click Here").setURL(invite)
.setDescription("Please be aware that you are inviting the bot with [Administrator]("+invite+") permissions, and you agree to that.")
.setColor('#AB8700')
.setTimestamp()
.setFooter(client.user.tag, client.user.avatarURL());
  message.channel.send(embed)      

  }
};
