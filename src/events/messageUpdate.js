const { MessageEmbed } = require("discord.js");


const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("messageUpdate");
  }
async run(client, oldMessage, newMessage) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(newMessage.guild.id);

    if (!newMessage.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    let logs = newMessage.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    let hid = settings.log.id;
    if (settings.log.toggle === "off") return;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
   if ([oldMessage, newMessage, oldMessage.guild, newMessage.guild, oldMessage.author].some(value => !value)) return;
        if ([oldMessage, newMessage, newMessage.content, oldMessage.content].some(value => !value)) return;
      if (oldMessage.content == newMessage.content) return;
        if (oldMessage.author.id == oldMessage.client.user.id) return;
        if (oldMessage.author.bot) return;
     const embed = new Discord.MessageEmbed({
            title: `Message edited in #${oldMessage.channel.name}`,
            author: {
                name: oldMessage.author.tag,
                icon_url: oldMessage.author.displayAvatarURL({
                    dynamic: true
                })
            },
            color: 0x3498db,
            fields: [{
                name: 'Old: ',
                value: Discord.Util.escapeMarkdown(oldMessage.content).slice(0, 1014)
            }, {
                name: 'New: ',
                value: Discord.Util.escapeMarkdown(newMessage.content).slice(0, 1014)
            }],
            timestamp: new Date(),
            footer: {
                text: `ID: ${oldMessage.id}`
            }
        })
    webhook.send(embed);
  }};
