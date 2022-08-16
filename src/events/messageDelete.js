const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("messageDelete");
  }
async run(client, message) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(message.guild.id);

    if (!message.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    let logs = message.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    if (settings.log.toggle === "off") return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
        let content = ''

        if (message.content) content += Discord.Util.escapeMarkdown(message.content).slice(0, 2038)
        if (message.attachments.first()) {
            content += message.attachments.map((a) => a.url).join(', ')
        }
    const embed = new Discord.MessageEmbed({
            title: `Message deleted in #${message.channel.name}`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL({ dynamic: true })
            },
            description: content || "Embed",
            color: 0xe74c3c,
            timestamp: new Date(),
            footer: {
                text: `ID: ${message.id}`
            }
        })
    webhook.send(embed);
  }};
