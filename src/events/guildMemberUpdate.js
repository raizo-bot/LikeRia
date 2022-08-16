const { MessageEmbed } = require("discord.js");


const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("guildMemberUpdate");
  }
async run(client, oldMember, newMember) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(oldMember.guild.id);
    if (!oldMember.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    let logs = oldMember.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    if (settings.log.toggle === "off") return;
    let hid = settings.log.id;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
    const embed = new Discord.MessageEmbed({
 title: null,
            author: {
                name: oldMember.user.tag,
                icon_url: oldMember.user.displayAvatarURL({ dynamic: true })
            },
            description: null,
            color: 0x3498db,
            fields: [],
            timestamp: new Date(),
            footer: {
                text: `ID: ${oldMember.id}`
            }
        })

        if (oldMember.nickname !== newMember.nickname) {
            embed.title = 'Nickname change'
            embed.fields.push({
                name: 'Old: ',
                value: oldMember.nickname || 'None'
            }, {
                name: 'New: ',
                value: newMember.nickname || 'None'
            })
            embed.color = 0x3498db
        } else if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
            if (newMember.roles.cache.size > oldMember.roles.cache.size) {
                const role = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first()
                embed.title = 'Role added'
                embed.color = 0x2ecc71
                embed.description = role.toString()
            } else {
                const role = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first()
                embed.title = 'Role removed'
                embed.color = 0xe74c3c
                embed.description = role.name
            }
          } else return
    webhook.send(embed);
  }};
