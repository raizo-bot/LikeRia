const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("channelDelete");
  }
async run(client, channel) {
    const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(channel.guild.id);

    if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    let logs = channel.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    if(settings.log.toggle === "off") return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
    if (channel.type === "text") {
    var channelType = "Text";
  } else if (channel.type === "voice") {
    var channelType = "Voice";
  } else if (channel.type === "category") {
    var channelType = "Category";
  }
    webhook.send(
      new Discord.MessageEmbed({
        title: `${
          channelType ? channelType : "Unknown"
        } Channel Deleted`,
        color: 0x2ecc71,
        fields: [
          {
            name: "Channel: ",
            value: `${
              channel.type !== "text"
                ? `\`${channel.name}\``
                : channel.toString()
            }`
          }
        ],
        timestamp: new Date(),
        footer: {text: `ID: ${channel.id}`    }
      })
    );
  }}

