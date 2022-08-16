const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const moment = require("moment");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "user",
      desc: "Shows (Someone/Your) Informations",
      category: "General",
      aliases: [],
      memberPerm: [],
      botPerm: [],
      examples: ["{user}"]
    });
  }

  async run(client, message, args) {
    let user;
    if (!args[0]) user = message.author;
    if (!user)
      user =
        message.mentions.users.first() ||
        message.client.users.cache.get(args[0]);
    if (!user && /^\d{17,19}$/.test(args[0]))
      user = await message.client.users.fetch(args[0]).catch(() => null);
    if (!user)
      return message.channel.send(new Discord.MessageEmbed().setColor("#cf1919").setDescription(`I'm can't find him /;`)
      );
    let member =  user;
    const members =
      message.mentions.members.get(user.id) ||
      (await message.guild.members.fetch(user.id).catch(() => null));
    // Badges
    let userFlags = user.flags.toArray();
    const flags = {
      DISCORD_EMPLOYEE: "<:DISCORD_EMPLOYEE:755040433163206656>",
      DISCORD_PARTNER: "<:DISCORD_PARTNER:755040434971082849>",
      BUGHUNTER_LEVEL_1: "<:BUG_HUNTER_LEVEL1:755040415794593832>",
      BUGHUNTER_LEVEL_2: "<:BUG_HUNTER_LEVEL2:755040419577987172>",
      HYPESQUAD_EVENTS: "<:HYPE_SQUADEVENTS:755040404709048461>",
      HOUSE_BRAVERY: "<:82781:755040411575386252>",
      HOUSE_BRILLIANCE: "<:45960:755040407108452352>",
      HOUSE_BALANCE: "<:HOUSEOFBALANCE:755040413655498772>",
      EARLY_SUPPORTER: "<:EARLY_SUPPORTER:755040436606992524>",
      TEAM_USER: "Team User",
      SYSTEM: "System",
      VERIFIED_BOT: "Verified Bot",
      VERIFIED_DEVELOPER: "<:VERIFED_DEVELEPOR:755040401135763457>"
    };
    //Status
    var presence;
    if (member.presence.activities[0])
      if (member.presence.activities[0].type == "PLAYING")
        presence = `Playing ${member.presence.activities[0].name}`;
      else if (member.presence.activities[0].type == "STREAMING")
        presence = `Streaming ${member.presence.activities[0].name}`;
      else if (member.presence.activities[0].type == "CUSTOM_STATUS")
        presence = `${member.presence.activities[0].state}`;
      else presence = "Nothing";
    if (presence == undefined) presence = "Nothing";
    if (presence == null) presence = "Emojis";
    let embed = new Discord.MessageEmbed()
      .setColor("#00BFFF")
      .setThumbnail(member.avatarURL({ dynamic: true }))
      .addField(
        "Username:",
        ` ${member.username} \`(${member.id})\`                              `
      )
      .addField(
        "About:",
        `
Account Created At: \`${moment(member.createdTimestamp).format(
          "YYYY/M/D HH:mm:ss"
        )} | ${moment(member.createdTimestamp).fromNow()}\`
Avatar: \`${member.avatarURL() ? "Yes" : "No"}\`
Bot: \`${member.bot || "No" || "Yes"}\`
User Status: \`${presence}\`
Badges: ${
          userFlags.length
            ? userFlags.map(flag => flags[flag]).join(" | ")
            : "`None`"
        }
`,
        true
      )
      .setFooter(
        `Reqeusted By: ${message.author.tag}`,
        message.author.avatarURL()
      )
      .setTimestamp();
    if (members) {
      embed.addField(
        "Member:",
        `
Joined At: \`${moment(members.joinedAt).format("LL LTS") +
          " (" +
          moment(members.joinedAt).fromNow() +
          ")"}\`
Highest Role: \`${
          members.roles.highest.id == message.guild.id
            ? "None"
            : Discord.Util.escapeMarkdown(members.roles.highest.name)
        }\`
              `
      );
    return message.channel.send(embed);
    }
  }
};
//Hello Hey..