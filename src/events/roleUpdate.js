const { MessageEmbed } = require("discord.js");


const BaseEvent = require("../utils/structures/BaseEvent");
module.exports = class Event extends BaseEvent {
  constructor() {
    super("roleUpdate");
  }
async run(client, oldRole, newRole) {
  const Discord = require("discord.js"),
      moment = require("moment");
    const settings = await client.getGuildSettings(newRole.guild.id);
    if (!newRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
      return;
    let logs = newRole.guild.channels.cache.find(
      x => x.id === settings.log.channel
    );
    if (!logs) return;
    let hid = settings.log.id;
    if (settings.log.toggle === "off") return;
    const webhooks = await logs.fetchWebhooks();
    const webhook = await webhooks.filter(web => web.id === hid).first();
const embed = new Discord.MessageEmbed({
            title: `Role "${oldRole.name}" updated`,
            color: 0x3498db,
            timestamp: new Date(),
            fields: [],
            footer: {
                text: `ID: ${oldRole.id}`
            }
        })

        if (oldRole.name !== newRole.name) {
            embed.fields.push({
                name: 'Before',
                value: '**Name: **' + oldRole.name
            }, {
                name: 'After',
                value: '**Name: **' + newRole.name
            })
        } else if (oldRole.color !== newRole.color) {
            embed.fields.push({
                name: 'Before',
                value: '**Color: **' + oldRole.hexColor
            }, {
                name: 'After',
                value: '**Color: **' + newRole.hexColor
            })
        } else if (oldRole.hoist !== newRole.hoist) {
            embed.fields.push({
                name: 'Before',
                value: '**Separated: **' + (oldRole.hoist ? 'Yes' : 'No')
            }, {
                name: 'After',
                value: '**Separated: **' + (newRole.hoist ? 'Yes' : 'No')
            })
        } else if (oldRole.mentionable !== newRole.mentionable) {
            embed.fields.push({
                name: 'Before',
                value: '**Mentionable: **' + (oldRole.mentionable ? 'Yes' : 'No')
            }, {
                name: 'After',
                value: '**Separated: **' + (newRole.mentionable ? 'Yes' : 'No')
            })
      
        } else return

    webhook.send(embed);
  }};
