const { MessageEmbed } = require("discord.js");

const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("guildBanAdd");
  }
async run(client, user) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(user.guild.id);
    if (!user.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    if (settings.log.toggle === "off") return;
    let logs = user.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
    const embed = new Discord.MessageEmbed({
      title: "Member banned",
      author: {
        name: user.tag,
        icon_url: user.displayAvatarURL({
          dynamic: true
        })
      },
      color: 0xe74c3c,
      description: `Created at: ${moment(user.createdTimestamp).fromNow()}`,
      timestamp: new Date(),
      footer: {
        text: `ID: ${user.id}`
      }
    });
    webhook.send(embed);
  }};
