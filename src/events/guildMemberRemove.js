const { MessageEmbed } = require("discord.js");
const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("guildMemberRemove");
  }
async run(client, member) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(member.guild.id);

    if (!member.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    let logs = member.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    if (settings.log.toggle === "off") return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
    const embed = new Discord.MessageEmbed({
 title: 'Member left',
            author: {
                name: member.user.tag,
                icon_url: member.user.displayAvatarURL({
                    dynamic: true
                })
            },
            color: 0xe74c3c,
            description: `${member}\nJoined: ${moment.duration(Date.now() - member.joinedTimestamp).format('M [months], W [weeks], D [days], H [hrs], m [mins], s [secs]')}`,
            fields: [],
            timestamp: new Date(),
            footer: {
                text: `ID: ${member.id}`
            }})
    webhook.send(embed);
  }};
