const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const moment = require("moment")
const embedcolor = "GREEN";
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
    name: "warns",
    desc: "Shows Warns user",
    usage: "[p]warns <user>",
    category: "Moderation",
    aliases: [],
    memberPerm: ["MANAGE_GUILD"],
    botPerm: ["MANAGE_GUILD"],
    examples:["{user}"]         
    });
  }
    async run(client, message, args) {
        let user = message.mentions.users.first() || message.author;
    const warns = await client.getMemberData(user.id, message.guild.id);

message.channel.send({ embed: new MessageEmbed()
        .setColor("#f2b40a")
        .setDescription(warns.warns.length ? warns.warns.map((warn, i)=> `__**#${i + 1}**__- ${warn.reason} | ${moment(new Date(warn.date),"YYYYMMDD").fromNow()} | ${warn.by}`).join("\n") : "`No Warnings Found!`")
        .setFooter(`Total Warnings for ${user.username}#${user.discriminator} is ${warns.warns ? warns.warns.length : 1}`)
        .setTimestamp()});
    }
}