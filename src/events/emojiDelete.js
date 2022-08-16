const { MessageEmbed } = require("discord.js");

const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("emojiDelete");
  }
async run(client, emoji) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(emoji.guild.id);
    if (!emoji.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    if (settings.log.toggle === "off") return;
    let logs = emoji.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
    webhook.send(new MessageEmbed({
            title: 'Emoji deleted',
            color: 0x2ecc71,
            timestamp: new Date(),
            thumbnail: {
                url: emoji.url
            },
            footer: {
                text: `ID: ${emoji.id}`
            }
        })
    );
  }};
