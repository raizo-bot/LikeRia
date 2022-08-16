const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("channelCreate");
  }
  async run(client, channel) {
    const Discord = require("discord.js"),
      moment = require("moment");
    const ms = require("ms");
    const settings = await client.getGuildSettings(channel.guild.id);
    if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    const user = await channel.guild
      .fetchAuditLogs({
        type: "CHANNEL_CREATE"
      })
      .then(audit => audit.entries.first());
    const entry = user.executor;
    const data = await client.getMemberData(entry.id, channel.guild.id);
    console.log(
        ms(settings.protect.time + settings.protect.timelet) -
     (Date.now() - data.time)
    );
    await client.db.member.findOneAndUpdate(
      {
        userID: client.users.cache.get(entry.id).id,
        guildID: channel.guild.id
      },
      { time: Date.now() }
    );
    console.log(data.protectchannelc);
    console.log(data.time);
    if (settings.protect.toggle === "on") {
      await client.db.member.findOneAndUpdate(
        { userID: entry.id, guildID: channel.guild.id },
        { protectchannelc: data.protectchannelc + 1 }
      );
      if (
        ms(settings.protect.time + settings.protect.timelet) - 
        (Date.now() - data.time)
        >= 0 
      ) {
        if (data.protectchannelc > settings.protect.channelc) {
          console.log("SAD");
           await client.db.member.findOneAndUpdate(
        { userID: entry.id, guildID: channel.guild.id },
        { protectchannelc: 0 }
      );
          
        } else {
          //add
          console.log("SAD ADD");
        }
      } else {
        console.log("FIND TIME");
        // هنا يضيف عادي :( لانه لسا فيه وقت
      }
    }

    // log
    if (settings.log.toggle === "on") {
      let logs = channel.guild.channels.cache.find(
        x => x.id === settings.log.channel
      );
      if (!logs) return;
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
          title: `${channelType ? channelType : "Unknown"} Channel Created`,
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
          footer: { text: `ID: ${channel.id}` }
        })
      );
    }
    // protect
  }
};
