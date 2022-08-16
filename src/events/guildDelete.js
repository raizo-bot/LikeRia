const BaseEvent = require("../utils/structures/BaseEvent");
const { MessageEmbed } = require("discord.js");

module.exports = class GuildRemove extends BaseEvent {

  constructor() {

    super("guildDelete");

  }

  

  async run(client, guild) {
    let embed = new MessageEmbed()
    .setColor("#cf1919").setAuthor(guild.name, guild.iconURL())
    .setDescription(`Left __\`${guild.name}\`__ with __\`${guild.memberCount}\`__ member, i'm in ${client.guilds.cache.size} server.`)
 client.channels.cache.get("818611985682923550").send(embed);
    }  }


