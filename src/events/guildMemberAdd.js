const { MessageEmbed } = require("discord.js");

const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }
async run(client, member, guild) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(member.guild.id);

    if (!member.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;

    const entry1 = await member.guild
      .fetchAuditLogs()
      .then(audit => audit.entries.first());
    const entry = entry1.executor;
    let logs = member.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (settings.welcome.channel) {
    if (settings.welcome.toggle === "off") return;
      if (!member.guild.member(client.user).hasPermission("SEND_MESSAGES"))
        return;
      const channel = member.guild.channels.cache.find(
        x => x.id === settings.welcome.channel
      );
      if (channel) {
        channel
          .send(
            (settings.welcome.message
              ? settings.welcome.message
              : `**Welcome to ${guild.name}**`
            )
              .replace("[user]", member)
              .replace("[userName]", member.username)
              .replace("[server]", member.guild.name)
              .replace("[members]", member.guild.memberCount)
          )
          .catch(() => {});
      }
    }
    if (settings.autoRole.role) {
    if (settings.autoRole.toggle === "off") return;
      if (!member.guild.member(client.user).hasPermission("MANAGE_ROLES"))
        return;
      const role = member.guild.roles.cache.find(
        x => x.id === settings.autoRole.role
      );
      if (role) {
        member.roles.add(role.id, "AutoRole").catch(() => {});
      }
    }
    if (settings.log.toggle === "off") return;
    if (!logs) return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
    const embed = new Discord.MessageEmbed({
      title: "Member joined",
      author: {
        name: member.user.tag,
        icon_url: member.user.displayAvatarURL({ dynamic: true })
      },
      color: 0x2ecc71,
      description: `${member} ${member.guild.memberCount.toLocaleString(
        "en"
      )}th to join!\nCreated: ${moment(
        member.user.createdTimestamp
      ).fromNow()}`,
      timestamp: new Date(),
      footer: {
        text: `ID: ${member.id}`
      }
    });
    webhook.send(embed);
  }};
