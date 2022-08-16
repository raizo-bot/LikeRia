const { MessageEmbed } = require("discord.js");

const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("roleDelete");
  }
async run(client, role) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(role.guild.id);

    if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    let logs = role.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    if (settings.log.toggle === "off") return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();

    webhook.send(new MessageEmbed({
           title: 'Role deleted',
            color: 0x2ecc71,
            timestamp: new Date(),
            description: [
                `**Name:** \`${role.name}\``,
                `**Color:** \`${role.hexColor}\``,
                `**Mentionable:** \`${role.mentionable ? 'Yes' : 'No'}\``,
                `**Displayed separately:** \`${role.hoist ? 'Yes' : 'No'}\``
].join('\n'),
            footer: {
                text: `ID: ${role.id}`
            }
        })
    );
  }};
