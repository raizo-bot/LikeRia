const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "ping",
      desc: "Pong!",
      category: "General",
      aliases: [],
      usage: "[p]ping",
      memberPerm: [],
      botPerm: [],
      examples: []
    });
  }

  async run(client, message, args) {
    let msg = await message.channel.send(
      new Discord.MessageEmbed().setDescription("Pong!").setColor("#AB8700")
    );
    const ping = Math.abs(
      msg.createdTimestamp - message.createdTimestamp - message.client.ws.ping
    );
    msg.edit(
      new Discord.MessageEmbed()
        .setColor("#AB8700")
        .setDescription(`Ping: \`${ping}ms\``)
    );
  }
};
