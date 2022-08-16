const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("channelUpdate");
  }
async run(client, newChannel, oldChannel) {
    const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(oldChannel.guild.id);
    if (!oldChannel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    if(settings.log.toggle === "off") return;
    let logs = oldChannel.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
    const embed = new Discord.MessageEmbed({
      title: `${oldChannel.type} channel updated`,
      color: 0x3498db,
      fields: [],
      timestamp: new Date(),
      footer: {
        text: `ID: ${oldChannel.id}`
      }
    });

    if (oldChannel.name !== newChannel.name) {
      embed.fields.push(
        {
          name: "Before",
          value: "**Name: **" + oldChannel.name
        },
        {
          name: "After",
          value: "**Name: **" + newChannel.name
        }
      );
    } else if (oldChannel.topic !== newChannel.topic) {
      embed.fields.push(
        {
          name: "Before",
          value: "**Topic: **" + (oldChannel.topic || "None")
        },
        {
          name: "After",
          value: "**Topic: **" + (newChannel.topic || "None")
        }
      );
    } else if (oldChannel.nsfw !== newChannel.nsfw) {
      embed.fields.push(
        {
          name: "Before",
          value: "**NSFW: **" + (oldChannel.nsfw ? "Yes" : "No")
        },
        {
          name: "After",
          value: "**NSFW: **" + (newChannel.nsfw ? "Yes" : "No")
        }
      );
    } else if (oldChannel.rawPosition !== newChannel.rawPosition) {
      embed.fields.push(
        {
          name: "Before",
          value: "**Position: **" + oldChannel.rawPosition
        },
        {
          name: "After",
          value: "**Position: **" + newChannel.rawPosition
        }
      );
    } else if (oldChannel.bitrate !== newChannel.bitrate) {
      embed.fields.push(
        {
          name: "Before",
          value: "**Bitrate: **" + oldChannel.bitrate + "kbps"
        },
        {
          name: "After",
          value: "**Bitrate: **" + newChannel.bitrate + "kbps"
        }
      );
    } else return;

    webhook.send(embed);
}};

