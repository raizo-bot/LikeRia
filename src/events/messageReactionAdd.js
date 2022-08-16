const BaseEvent = require("../utils/structures/BaseEvent");
const { MessageEmbed } = require("discord.js");

module.exports = class GuildAdd extends BaseEvent {
  constructor() {
    super("messageReactionAdd");
  }

  async run(client, reaction, user) {
    if (user.bot || !reaction.message || !reaction.message.guild) return;

    const message = reaction.message;
    const permissions = message.channel.permissionsFor(message.guild.me);

    if (
      !permissions ||
      !permissions.has([
        "MANAGE_ROLES",
        "MANAGE_MESSAGES",
        "READ_MESSAGE_HISTORY"
      ])
    )
      return;
    const settings = await client.getGuildSettings(message.guild.id);

    const { reaction_roles } = settings;
    const data = reaction_roles.filter(r => r.message_id == message.id);
    const _ = data.find(
      r => r.reaction == (reaction.emoji.id || reaction.emoji.name)
    );

    if (!_) return;

    const member =
      message.guild.members.cache.get(user.id) ||
      (await message.guild.members.fetch(user.id).catch(() => null));

    if (!member) return;

    const roles = data.map(r => r.role_id);
    const { type, role_id } = _;

    await member.roles.add(role_id).catch(() => null);
  }
};
