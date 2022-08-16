const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: "warn",
      desc: "Warns a user",
      usage: "[p]warn <user> <reason>",
      category: "mod",
      aliases: [],
      memberPerm: ["MANAGE_GUILD"],
      botPerm: ["MANAGE_GUILD"],
      examples: ["{user}", "{user} Spamming"]
    });
  }
  async run(client, message, args) {
    let g = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let user =
      message.mentions.users.first() || message.guild.members.cache.get(g);
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (!reason) reason = "`No Reason`";
    if (!user)
      return message.channel.send(
        new MessageEmbed()
          .setDescription("Missing argument, the `user` argument is required!")
          .setColor("#cf1919")
      );
    if (user.id === message.guild.ownerID)
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setDescription("You Cant Warn The Owner Ship")
      );
    if (message.author.id === user.id)
      return message.channel.send(
        new MessageEmbed()
          .setDescription("You cant give yourself warn")
          .setColor("#00BFFF")
      );

    const warns = await client.getMemberData(user.id, message.channel.guild.id);

    message.channel.send({
      embed: new MessageEmbed()
        .setColor("#f2b40a")
        .setTitle(`${user.tag}'s Warned`)
        .addField("Member: ", `**${user} (ID: \`${user.id}\`)**`)
        .addField("Reason: ", reason, true)
        .addField(
          "Moderator: ",
          `**${message.author.username}#${message.author.discriminator} (ID: \`${message.author.id}\`)**`
        )
        .setFooter(
          `Total Warnings for ${user.tag} is ${(warns.warns
            ? warns.warns.length
            : 1) + 1}`
        )
        .setTimestamp()
    });

    await client.db.member.findOneAndUpdate(
      { guildID: message.guild.id, userID: user.id },
      {
        $push: {
          warns: [
            {
              reason: reason,
              date: Date.now(),
              by: message.author.tag,
              moderator: {
                tag: `${message.author.username}#${message.author.discriminator}`,
                id: message.author.id
              }
            }
          ]
        }
      }
    );
    user
      .send({
        embed: new MessageEmbed()

          .setTitle(":warning: You were warned!")
          .addField("Reason: ", reason, false)
          .addField(
            "Moderator: ",
            `${message.author.username}#${message.author.discriminator}`
          )
          .setFooter(`${message.guild.name}`, message.guild.iconURL())
          .setColor("#f2b40a")
          .setTimestamp()
      })
      .catch(() => {});
  }
};
